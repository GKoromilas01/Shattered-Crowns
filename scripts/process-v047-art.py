# Cuts out and resizes the Leonardo originals in assets/v047/originals into assets/v047/runtime.
import os, numpy as np
from PIL import Image
from scipy import ndimage as ndi
O='assets/v047/originals/';R='assets/v047/runtime/'
os.makedirs(R,exist_ok=True)
SCENES={'trader':960,'bandits':960,'refugees':960,'ship':960,'story_peace':960,'story_raid':960,'story_ash':960,'trail_woodland':960,'trail_coastal':960,'trail_dryland':960,'arrival':960,'feast':960,'sickness':960,'advisor':480}
TEX={'tex_road':256,'tex_grass':256}
CUT={'keep':320,'house':220,'farm':300,'oak':240,'birch':170,'pine':170,'stone':200,'gold':200,'icon_gold':96,'icon_food':96,'icon_trade':96,'icon_wood':96,'icon_stone':96,
 'market':260,'granary':220,'lumberyard':240,'bakery':220,'fishery':240,'theater':260,'school':240,'chapel':220,'workshop':230,'clinic':220,'fortress':360,'tower':200,'wall':260,'well':140,'garden':160,'plaza':200,'loadingyard':240,'shipyard':260,'stable':240,'camp':240,'bush':110,'bridge':220,
 'unit_worker':120,'unit_soldier':120,'unit_archer':120,'unit_raider':120}
def ex(n): return os.path.exists(O+n+'.jpg')
def scene(n,w):
    im=Image.open(O+n+'.jpg').convert('RGB');h=round(im.height*w/im.width);im.resize((w,h),Image.LANCZOS).save(R+n+'.webp',quality=80,method=6)
def tex(n,w):
    im=Image.open(O+n+'.jpg').convert('RGB').resize((w,w),Image.LANCZOS);im.save(R+n+'.webp',quality=82,method=6)
def cut(n,w):
    im=Image.open(O+n+'.jpg').convert('RGB');a=np.asarray(im).astype(float)/255
    mx=a.max(2);mn=a.min(2);sat=(mx-mn)/np.maximum(mx,1e-6)
    edge=np.concatenate([a[0],a[-1],a[:,0],a[:,-1]]);bgc=np.median(edge,axis=0);dist=np.sqrt(((a-bgc)**2).sum(2))
    cand=(((sat<0.13)&(mx>0.30))|(dist<0.09))
    lab,k=ndi.label(cand)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    bg=cand if n=='bridge' else np.isin(lab,list(border));fg=~bg
    fg=ndi.binary_opening(fg,iterations=2)
    lab2,k2=ndi.label(fg);sizes=ndi.sum(fg,lab2,range(1,k2+1));fg=lab2==(1+int(np.argmax(sizes)))
    fg=fg if n=='bridge' else ndi.binary_fill_holes(fg);fg=ndi.binary_erosion(fg,iterations=1)
    al=ndi.gaussian_filter(fg.astype(float),0.9);al=np.clip((al-0.15)/0.7,0,1)
    out=Image.fromarray(np.dstack([np.asarray(im),(al*255).astype(np.uint8)]),'RGBA')
    bb=out.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox();out=out.crop(bb)
    h=round(out.height*w/out.width);out=out.resize((w,h),Image.LANCZOS);out.save(R+n+'.webp',quality=90,method=6,exact=True)
    print(n,out.size)
for d,f in ((SCENES,scene),(TEX,tex),(CUT,cut)):
    for n,w in d.items():
        if ex(n):f(n,w)
