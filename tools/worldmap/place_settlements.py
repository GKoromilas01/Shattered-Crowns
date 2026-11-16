import numpy as np, json, sys
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter, distance_transform_edt, uniform_filter
from scipy.optimize import linear_sum_assignment
from skimage import measure
D='/tmp/claude-0/-home-claude/6567a341-b358-5f77-b35c-31d3864c8c0e/scratchpad/mapgen/'
m=np.load(D+'map_final_masks.npz');label=m['label'];land=m['land'];water=m['water'];elev=m['elev'];riv=m['riv'];mount=m['mount'];fw=m['fw'];oasis=m['oasis']
H,W=land.shape
names=['aurelia','frostward','emberreach','verdance','stormisles','southveil']
kings={'aurelia':['marches','duskmoor','lyran'],'frostward':['winter-crown','veyrn'],'emberreach':['cinder-coast','solen','ember','caldris','saffron'],'verdance':['briar','greenwater','vaskor'],'stormisles':['stormhaven','sable'],'southveil':['mistmere']}
anchors={'marches':[30,62],'cinder-coast':[34,26],'winter-crown':[62,34],'veyrn':[32,59],'duskmoor':[65,61],'lyran':[58,25],'briar':[31,28],'solen':[67,65],'ember':[65,30],'caldris':[37,62],'saffron':[57,47],'greenwater':[69,48],'vaskor':[41,73],'stormhaven':[31,34],'mistmere':[49,47],'sable':[72,69]}
SW,SH=1100,740
dist_in=distance_transform_edt(land&~water);dist_out=distance_transform_edt(~land)
dist_riv=distance_transform_edt(riv<.25);dist_lake=distance_transform_edt(~water)
dist_mt=distance_transform_edt(mount<.22)
cache={}
def win(a,y,x,r):
    k=(id(a),r)
    if k not in cache:cache[k]=uniform_filter(a.astype(np.float32),2*r+1)
    return float(cache[k][y,x])
out={'continents':{},'sites':{}};rng=np.random.default_rng(5)
overrides={'briar-3':'wood','saffron-3':'dry','stormhaven-2':'coast','home':'seat','brookstead':'farm','ashford':'river','valewatch':'edge','ironmere':'craft'}
roles=['seat','craft','farm','road','pasture','store','wood','coast']
for ci,cname in enumerate(names):
    cm=(label==ci)&land
    ys,xs=np.where(cm)
    x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max()
    padx=(x1-x0)*.06;pady=(y1-y0)*.08
    cw=(x1-x0)+2*padx;ch=(y1-y0)+2*pady
    if cw/ch<SW/SH:cw=ch*SW/SH
    else:ch=cw*SH/SW
    if cw>W:cw=W;ch=cw*SH/SW
    if ch>H:ch=H;cw=ch*SW/SH
    cx=(x0+x1)/2-cw/2;cy=(y0+y1)/2-ch/2
    cx=min(max(cx,0),W-cw);cy=min(max(cy,0),H-ch)
    cx,cy,cw,ch=[int(round(v)) for v in (cx,cy,cw,ch)]
    sc=SW/cw  # surface px per source px
    # polygons (local pct)
    sm=gaussian_filter(cm.astype(float),2.0)
    cont=measure.find_contours(np.pad(sm,1),.5)
    polys=[]
    for c in cont:
        c=c-1
        if len(c)<40:continue
        pg=measure.approximate_polygon(c,2.2)
        a=.5*abs(np.dot(pg[:-1,1],np.roll(pg[:-1,0],1))-np.dot(pg[:-1,0],np.roll(pg[:-1,1],1)))
        if a<900:continue
        polys.append((a,[[round((p[1]-cx)/cw*100,2),round((p[0]-cy)/ch*100,2)] for p in pg[:-1]]))
    polys.sort(key=lambda t:-t[0])
    # kmeans cells
    ks=kings[cname];K=len(ks)
    idx=rng.choice(len(ys),min(len(ys),20000),replace=False);P=np.stack([xs[idx],ys[idx]],1).astype(float)
    cen=P[rng.choice(len(P),K,replace=False)]
    for _ in range(40):
        d=((P[:,None,:]-cen[None])**2).sum(2);a=d.argmin(1)
        for k in range(K):
            if (a==k).any():cen[k]=P[a==k].mean(0)
    # assign kingdoms to centroids by nearest old anchor in crop-local space
    cost=np.zeros((K,K))
    for ki,k in enumerate(ks):
        ax=cx+anchors[k][0]/100*cw;ay=cy+anchors[k][1]/100*ch
        for j in range(K):cost[ki,j]=np.hypot(cen[j,0]-ax,cen[j,1]-ay)
    r,c_=linear_sum_assignment(cost);cell_of={ks[i]:c_[j] for j,i in enumerate(r)}
    # candidate grid
    step=max(4,int(cw/220))
    gy,gx=np.mgrid[y0:y1+1:step,x0:x1+1:step]
    cand=[(int(y),int(x)) for y,x in zip(gy.ravel(),gx.ravel()) if 70<y<H-80 and 80<x<W-80 and cm[y,x] and not water[y,x] and dist_in[y,x]>=0.5*24/sc]
    candc=np.array([[x,y] for y,x in cand]);
    d=((candc[:,None,:]-cen[None])**2).sum(2);cellid=d.argmin(1)
    placed=[]
    def ok(x,y,relax):
        px,py=(x-cx)*sc,(y-cy)*sc
        for qx,qy in placed:
            dx,dy=abs(px-qx),abs(py-qy)
            if not(dx>=SW*.046*relax or dy>=SH*.063*relax):return False
            if np.hypot(dx,dy)<62*relax:return False
        return True
    def score(role,y,x):
        e=elev[y,x];f=win(fw,y,x,18);rv=dist_riv[y,x];co=dist_out[y,x];mt=dist_mt[y,x];lk=dist_lake[y,x]
        des=1.0 if cname=='emberreach' else 0.0
        cen_=np.hypot(x-cen_c[0],y-cen_c[1])/(np.sqrt(cm.sum()/K)+1)
        if role=='seat':return -e*4-rv/200-cen_*.6
        if role=='craft':return -min(rv,lk)/60-e*2
        if role=='farm':return -e*3-min(rv,lk)/150-des*0.0
        if role=='road':return -cen_*1.5-e
        if role=='pasture':return -min(rv,lk)/120-abs(e-.12)*3
        if role=='store':return -mt/80-e*.5
        if role=='wood':return f*3-e
        if role=='dry':return -win(fw,y,x,18)*2+ (0 if des else -1)-e
        if role=='coast':return -co/40-abs(e-.1)
        if role=='river':return -rv/50-e*2
        if role=='edge':return -mt/90-cen_*.4
        return 0
    for k in ks:
        cc=cell_of[k];cen_c=cen[cc];mine=[i for i in range(len(cand)) if cellid[i]==cc]
        order=list(range(8));
        # place override-role slots first
        slots=[(i,overrides.get(k+'-'+str(i+1),overrides.get(['home','ironmere','ashford','valewatch','brookstead'][i],None) if k=='marches' and i<5 else None) or roles[i]) for i in range(8)]
        slots.sort(key=lambda t:0 if t[1] in('wood','dry','coast','river','edge') else 1)
        for i,role in slots:
            sid=(['home','ironmere','ashford','valewatch','brookstead'][i] if k=='marches' and i<5 else k+'-'+str(i+1))
            done=False
            for relax in (1,.9,.8,.7):
                best=None;bs=-1e9
                pool=mine if relax>=.9 else list(range(len(cand)))
                for j in pool:
                    y,x=cand[j]
                    if not ok(x,y,relax):continue
                    s=score(role,y,x)+rng.random()*.02
                    if s>bs:bs=s;best=(y,x)
                if best:done=True;break
            if not done:raise SystemExit('fail '+sid)
            y,x=best;placed.append(((x-cx)*sc,(y-cy)*sc))
            r_=int(20)
            forest=win(fw,y,x,r_)
            mtn=win(mount,y,x,r_);hi=win(elev,y,x,r_)
            coast=1 if dist_out[y,x]<70 else 0
            nearw=1 if min(dist_riv[y,x],dist_lake[y,x])<45 else 0
            if cname=='emberreach':
                oas=1 if dist_lake[y,x]<80 or win(oasis.astype(float),y,x,30)>0 else 0
                timber=2+(1 if forest>.18 else 0)+(1 if oas else 0);stone=2+(1 if mtn>.12 or hi>.22 else 0)+(1 if mtn>.3 else 0);game=4 if not oas else 3;fish=1+(1 if coast else 0)+(1 if oas or nearw else 0);farm=1+(2 if oas else 0)+(1 if nearw and not oas else 0)
                biome='oasis' if oas else ('dryland highland' if mtn>.12 else 'dryland')
            elif cname in('frostward','southveil'):
                timber=1+(1 if forest>.25 else 0);stone=3+(1 if mtn>.12 else 0);game=2+(1 if forest>.2 else 0);fish=2+(1 if coast else 0)+(1 if nearw else 0);farm=1
                biome='tundra highland' if mtn>.12 else 'tundra'
            else:
                timber=1+round(3*min(1,forest/.55));stone=1+round(3*min(1,(mtn*3+max(0,hi-.12)*2)));game=2+(1 if forest>.3 else 0)+(1 if mtn<.05 and forest<.3 else 0);fish=1+(1 if coast else 0)+(2 if nearw else 0)+(1 if coast and nearw else 0);farm=1+round(2*(1-min(1,hi/.3)))+(1 if nearw else 0)
                biome='forest' if forest>.3 else ('highland' if mtn>.12 or hi>.22 else ('coast' if coast else 'meadow'))
            cl=lambda v:int(max(1,min(4,v)))
            out['sites'][sid]={'x':round((x-cx)/cw*100,1),'y':round((y-cy)/ch*100,1),'b':biome,'r':[cl(timber),cl(stone),cl(game),cl(fish),cl(farm)],'k':k,'role':role}
    ev=[[(p[0]) for p in poly] for _,poly in polys]
    out['continents'][cname]={'crop':[cx,cy,cw,ch],'land':[poly for _,poly in polys],'center':[round(((xs.mean())/W)*100,1),round(((ys.mean())/H)*100,1)]}
    print(cname,'polys',len(polys),'verts',sum(len(p) for _,p in polys),'crop',cx,cy,cw,ch)
json.dump(out,open(D+'placement.json','w'),separators=(',',':'))
# preview overlay on world
im=Image.open(D+'map_final.png').convert('RGB');dr=ImageDraw.Draw(im)
for sid,s in out['sites'].items():
    c=out['continents'][[n for n in names if s['k'] in kings[n]][0]]['crop']
    X=c[0]+s['x']/100*c[2];Y=c[1]+s['y']/100*c[3]
    col={'oasis':(255,0,255),'forest':(255,255,0)}.get(s['b'],(255,255,255))
    dr.ellipse((X-9,Y-9,X+9,Y+9),fill=col,outline=(0,0,0),width=2)
im.resize((1344,768)).save(D+'placement_preview.png')
