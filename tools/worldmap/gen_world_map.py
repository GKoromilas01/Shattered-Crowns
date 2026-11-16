import numpy as np, sys
from PIL import Image
from scipy.ndimage import gaussian_filter, zoom, distance_transform_edt
S=float(sys.argv[3]) if len(sys.argv)>3 else 1.0
W,H=int(1344*S),int(768*S)
seed=int(sys.argv[1]) if len(sys.argv)>1 else 21
rng=np.random.default_rng(seed)
def fbm(oct=6,base=3,pers=.55,ridged=False):
    out=np.zeros((H,W));amp=1;tot=0
    for o in range(oct):
        n=base*2**o;g=rng.random((max(3,int(n*H/W))+2,n+2))
        z=zoom(g,(H/g.shape[0],W/g.shape[1]),order=3)[:H,:W]
        if ridged:z=1-np.abs(2*z-1)
        out+=amp*z;tot+=amp;amp*=pers
    return out/tot
yy,xx=np.mgrid[0:H,0:W];X=xx/W;Y=yy/H
def col(h):return np.array(h,float)/255
wx=(fbm(6,3)-.5)*.16+(fbm(5,14,.6)-.5)*.035;wy=(fbm(6,3)-.5)*.22+(fbm(5,14,.6)-.5)*.05
Xw=X+wx;Yw=Y+wy
cont={
 'aurelia':[(.23,.34,.15,.21),(.16,.27,.09,.12),(.30,.43,.09,.10),(.14,.44,.07,.08),(.31,.25,.06,.08)],
 'frostward':[(.49,.15,.07,.09),(.40,.10,.04,.06),(.58,.12,.05,.06),(.54,.24,.03,.04),(.44,.22,.03,.04),(.64,.20,.025,.04)],
 'emberreach':[(.76,.60,.13,.19),(.84,.50,.08,.12),(.69,.70,.09,.10),(.83,.72,.07,.08),(.70,.50,.06,.07)],
 'verdance':[(.22,.78,.12,.13),(.14,.72,.07,.09),(.30,.85,.07,.07),(.12,.84,.05,.06)],
 'stormisles':[(.40,.58,.03,.05),(.45,.65,.035,.045),(.49,.60,.03,.04),(.53,.67,.035,.05),(.57,.58,.03,.04),(.46,.73,.03,.04),(.61,.66,.025,.035),(.37,.67,.022,.03)],
 'southveil':[(.52,.93,.22,.045),(.38,.91,.09,.04),(.68,.94,.10,.035),(.30,.95,.06,.03)],
}
names=list(cont);fields=[]
for n in names:
    f=np.zeros((H,W))
    for cx,cy,rx,ry in cont[n]:
        d=((Xw-cx)/rx)**2+((Yw-cy)/ry)**2;f=np.maximum(f,np.exp(-d**1.2*.9))
    fields.append(f)
fields=np.array(fields);label=fields.argmax(0)
land=(fields.max(0)+(fbm(7,6,.6)-.5)*.95)>.42
dist_in=distance_transform_edt(land);dist_out=distance_transform_edt(~land)
# mountain chains
chains={'aurelia':[[(.10,.24),(.18,.30),(.26,.32),(.33,.40)],[(.27,.17),(.33,.25),(.37,.33)]],
 'emberreach':[[(.70,.52),(.78,.50),(.87,.46)],[(.72,.67),(.80,.71),(.88,.66)]],
 'verdance':[[(.11,.74),(.20,.71),(.29,.77)]],
 'frostward':[[(.42,.11),(.50,.14),(.58,.12)],[(.50,.20),(.55,.25)]],
 'stormisles':[[(.45,.62),(.49,.60)]],
 'southveil':[[(.33,.92),(.46,.93),(.58,.92),(.70,.94)]]}
def segdist(p,q):
    px,py=p;qx,qy=q;dx,dy=qx-px,qy-py;l2=dx*dx+dy*dy+1e-9
    t=np.clip(((Xw-px)*dx+(Yw-py)*dy)/l2,0,1);return np.hypot((Xw-(px+t*dx))*1.75,(Yw-(py+t*dy)))
mount=np.zeros((H,W));rid=fbm(6,5,.55,ridged=True)
for n,cl in chains.items():
    for ch in cl:
        d=np.full((H,W),9.)
        for a,b in zip(ch[:-1],ch[1:]):d=np.minimum(d,segdist(a,b)+ (fbm(3,4)-.5)*.0)
        w=.026 if n!='southveil' else .03
        wm=w*(.55+.9*fbm(4,4));mount=np.maximum(mount,np.exp(-(d/wm)**2)*(.25+1.6*np.clip(rid-.42,0,1))*(.7+.6*fbm(6,9)))
mount*=land
low=np.clip(dist_in/(260*S),0,1)*.14+.04
hills=(fbm(6,5,.55)-.45)*.22+(label==4)*(fbm(6,9,.6)-.42)*.30
elev=np.where(land,low+mount*.8+hills*np.clip(dist_in/(14*S),0,1),0)
elev=gaussian_filter(elev,.8*S)
# hillshade
gy,gx=np.gradient(gaussian_filter(elev,.7*S)*70*S)
shade=np.clip(.88+(-gx*.8-gy*.7)*.6,.45,1.4)
moist=fbm(5,3)
lake=np.zeros((H,W),bool);oasis=np.zeros((H,W),bool);lake_pts=[]
lnz=fbm(5,8)
def place_lakes(ci,count,rmin,rmax,mind,kind):
    ys,xs=np.where((label==ci)&land&(dist_in>38*S)&(elev<.30));
    if len(ys)==0:return
    chosen=[]
    for k in rng.permutation(len(ys)):
        y,x=ys[k],xs[k]
        if all(np.hypot(y-cy,x-cx)>mind*S for cy,cx,_ in chosen+[(a,b,0) for a,b,_ in lake_pts]):
            chosen.append((y,x,rng.uniform(rmin,rmax)*S))
        if len(chosen)>=count:break
    for y,x,r in chosen:
        m=np.hypot(yy-y,xx-x)<r*(.35+1.1*np.clip(lnz-.2,0,1)*1.3+.5*fbm(7,20));
        (oasis if kind=='oasis' else lake).__setitem__(m,True);lake_pts.append((y,x,kind))
for ci,n in enumerate(names):
    if n=='aurelia':place_lakes(ci,5,5,11,100,'lake')
    if n=='verdance':place_lakes(ci,5,5,10,90,'lake')
    if n=='emberreach':place_lakes(ci,5,3,5.5,80,'oasis')
    if n=='frostward':place_lakes(ci,3,4,8,60,'lake')
    if n=='stormisles':place_lakes(ci,1,3,5,40,'lake')
water=lake|oasis
pal={'aurelia':((108,138,72),(70,108,56),(132,122,98)),'frostward':((214,224,226),(188,202,208),(246,248,250)),
 'emberreach':((218,190,124),(190,150,92),(150,112,82)),'verdance':((84,150,60),(44,110,50),(112,124,92)),
 'stormisles':((122,150,88),(88,124,72),(128,124,106)),'southveil':((150,156,142),(118,126,120),(190,194,190))}
img=np.zeros((H,W,3))
for i,n in enumerate(names):
    lo,mid,hi=[col(c) for c in pal[n]];m=(label==i)&land
    t1=np.clip((elev-.14)/.30,0,1)[...,None];t2=np.clip((elev-.42)/.35,0,1)[...,None]
    base=lo*(1-t1)+mid*t1;base=base*(1-t2)+hi*t2
    base=base*(1-((moist-.5)*.30)[...,None]) if n not in('frostward','southveil') else base
    img[m]=base[m]
# trees / scrub stipple
def stipple(mask,color,count,sz,strength,weight=None):
    global img
    ys,xs=np.where(mask)
    if len(ys)==0:return
    if weight is not None:
        cand=rng.choice(len(ys),min(len(ys),count*4),replace=False);keep=rng.random(len(cand))<weight[ys[cand],xs[cand]];idx=cand[keep][:count]
    else:idx=rng.choice(len(ys),min(count,len(ys)),replace=False)
    from scipy.ndimage import maximum_filter
    acc=np.zeros((H,W));acc[ys[idx],xs[idx]]=1
    acc=maximum_filter(acc,size=max(2,int(round(2.4*sz*S))));acc=gaussian_filter(acc,.5*S)
    img=img*(1-acc[...,None]*strength)+color*acc[...,None]*strength
def sm(x,a,b):
    t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
low_ok=((elev<.34)&land&~water).astype(float)
fw=sm(fbm(5,5,.6),.34,.60)*low_ok
oas_near=np.exp(-(distance_transform_edt(~oasis)/(24*S))**2)
riv_near_pre=None
for i,n in enumerate(names):
    m=(label==i)&land&~water&(elev<.34)
    if n in('aurelia','verdance','stormisles'):
        stipple(m,col((30,76,40)),int(34000*S*S),1.0,.82,fw);stipple(m,col((78,126,62)),int(12000*S*S),1.0,.55,fw*(fbm(4,9)>.5))
        stipple(m,col((150,170,96)),int(9000*S*S),.9,.30,low_ok*(1-fw))
    if n=='emberreach':
        wd=np.clip(.12+.55*sm(fbm(5,6,.6),.45,.65)+.8*oas_near,0,1)*low_ok
        stipple(m,col((92,102,54)),int(15000*S*S),1.0,.78,wd);stipple(m,col((126,96,62)),int(9000*S*S),1.0,.55,wd)
        stipple(m,col((38,96,46)),int(5000*S*S),1.2,.9,oas_near*low_ok)
# beaches
beach=np.clip(1-dist_in/(3.2*S),0,1)*land*(label!=1)*(label!=5)
img=img*(1-beach[...,None]*.7)+col((226,208,160))*beach[...,None]*.7
img=img*shade[...,None]
rock=np.clip((fbm(5,6,.55,ridged=True)-.72)*7,0,1)*land*(label==2)*(elev<.55)
img=img*(1-rock[...,None]*.6)+col((138,92,66))*rock[...,None]*.6*shade[...,None]
# ice cracks / snow
ice=(label==1)&land
crack=np.clip((fbm(5,9,.55,ridged=True)-.82)*9,0,1)*ice
img=img*(1-crack[...,None]*.35)+col((120,150,178))*crack[...,None]*.35
snow=np.clip((elev+(fbm(5,9)-.5)*.35-.72)*9,0,1)*land*(label!=2)
img=img*(1-snow[...,None]*.8)+col((244,246,242))*snow[...,None]*.8
# rivers
pot=gaussian_filter(elev,2*S)+dist_in*.0014/S+ (fbm(4,6)-.5)*.03
rv=np.zeros((H,W))
def river(y,x,steps=2500):
    path=[]
    for _ in range(steps):
        path.append((y,x));best=None;bv=1e9
        for dy in(-2,-1,0,1,2):
            for dx in(-2,-1,0,1,2):
                if dy==0 and dx==0:continue
                ny,nx=y+dy,x+dx
                if 0<=ny<H and 0<=nx<W:
                    v=pot[ny,nx]+rng.random()*.0012
                    if v<bv:bv=v;best=(ny,nx)
        if best is None:break
        y,x=best
        if not land[y,x]:path.append((y,x));break
        if len(path)>40 and bv>pot[path[-5][0],path[-5][1]]-1e-6 and pot[y,x]>pot[path[-2][0],path[-2][1]]:pass
    return path
srcs={'aurelia':9,'verdance':9,'emberreach':4,'stormisles':3,'frostward':3}
for i,n in enumerate(names):
    if n not in srcs:continue
    ys,xs=np.where((label==i)&land&(elev>.30)&(elev<.8))
    if len(ys)==0:ys,xs=np.where((label==i)&land&(elev>.15))
    if len(ys)==0:continue
    for k in rng.choice(len(ys),min(srcs[n],len(ys)),replace=False):
        p=river(ys[k],xs[k])
        for j,(y,x) in enumerate(p):rv[y,x]=max(rv[y,x],.4+min(1,j/(600*S))*.9)
for (y,x,k) in lake_pts:
    if k=='lake' or rng.random()<.6:
        p=river(y,x)
        for j,(py,px) in enumerate(p):rv[py,px]=max(rv[py,px],.6+min(1,j/(500*S))*.8)
riv=np.clip(gaussian_filter(rv,1.4*S)*6.5,0,1)*land
img=img*(1-riv[...,None]*.9)+col((64,120,164))*riv[...,None]*.9
dl=distance_transform_edt(water);dwo=distance_transform_edt(~water)
wcol=col((92,150,186))*(np.clip(dl/(14*S),0,1)[...,None]*-.35+1)
icew=(label==1)[...,None];wcol=np.where(icew,col((170,205,225))*(np.clip(dl/(10*S),0,1)[...,None]*-.2+1),wcol)
rim=np.clip(1-dwo/(2.2*S),0,1)*(~water)*land
img=img*(1-rim[...,None]*.35)
img=np.where(water[...,None],wcol,img)
green_rim=np.clip(1-dwo/(7*S),0,1)*(~water)*land*np.isin(label,[2])[...]*(oas_near>.2)
img=img*(1-green_rim[...,None]*.45)+col((84,138,62))*green_rim[...,None]*.45
# land edge darkening and fog on Southveil
edge=np.clip(1-dist_in/(2.0*S),0,1)*land;img=img*(1-edge[...,None]*.3)
fog=np.clip((fbm(4,3)-.42)*3,0,.6)*np.exp(-((Y-.94)/.06)**2)
img=img*(1-fog[...,None]*.5)+col((232,236,236))*fog[...,None]*.5
# ocean
depth=np.clip(dist_out/(46*S),0,1)**.7
shallow=col((96,170,176));deep=col((26,66,100))
sea=shallow*(1-depth[...,None])+deep*depth[...,None]
sea*=(0.93+0.14*fbm(5,4)[...,None])
for k,a in ((5,.09),(11,.05),(18,.03)):
    ring=np.exp(-((dist_out-k*S)/(.9*S))**2);sea=sea+col((200,232,232))*ring[...,None]*a
wv=(np.sin((yy+fbm(4,3)*70*S)*.2/S)*.5+.5)*.012;sea=sea+wv[...,None]
out=np.where(land[...,None],img,sea)
shore=np.clip(1-dist_out/(2.4*S),0,1)*(~land);out=out*(1-shore[...,None]*.5)+col((234,224,184))*shore[...,None]*.5
# parchment finish
v=np.clip(1-.5*(((X-.5)*1.5)**4+((Y-.5)*1.6)**4),0,1)
paper=0.55+0.45*fbm(7,5);stain=fbm(4,3)
out=out*(0.82+.18*v[...,None]);tone=col((238,214,168))
out=out*.88+tone*.12*paper[...,None];out=out*(1-.12*np.clip((stain-.5)*3,0,1)[...,None])
b=int(20*S);border=np.zeros((H,W),bool);border[:b]=border[-b:]=True;border[:,:b]=border[:,-b:]=True
out[border]=tone[None,:]*.64*paper[border][...,None]
ln=np.zeros((H,W),bool);t=max(2,int(2*S));ln[b:b+t,b:-b]=ln[-b-t:-b,b:-b]=True;ln[b:-b,b:b+t]=ln[b:-b,-b-t:-b]=True
out[ln]=col((78,54,34))
ln2=np.zeros((H,W),bool);o=int(7*S);ln2[o:o+t,o:-o]=ln2[-o-t:-o,o:-o]=True;ln2[o:-o,o:o+t]=ln2[o:-o,-o-t:-o]=True
out[ln2]=col((110,80,52))
out=np.clip(out,0,1)
Image.fromarray((out*255).astype(np.uint8)).save(sys.argv[2])
np.savez_compressed(sys.argv[2].replace('.png','_masks.npz'),label=label.astype(np.int8),land=land,water=water,elev=elev.astype(np.float32),riv=riv.astype(np.float32),mount=mount.astype(np.float32),fw=fw.astype(np.float32),dist_out=dist_out.astype(np.float32),oasis=oasis,lake=lake)
print('ok',W,H)
