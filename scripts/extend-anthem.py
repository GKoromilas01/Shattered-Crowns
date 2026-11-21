import sys,subprocess,numpy as np,scipy.io.wavfile as wf
name=sys.argv[1];target=float(sys.argv[2]);src=f'/home/claude/shattered-crowns/assets/v048/music-originals/{name}.mp3'
out=f'/home/claude/anthem-extend/{name}-long.wav'
subprocess.run(['ffmpeg','-y','-v','error','-i',src,'-ar','44100','-ac','2','/home/claude/anthem-extend/_s.wav'],check=True)
sr,st=wf.read('/home/claude/anthem-extend/_s.wav');st=st.astype(np.float32)/32768
mono=st.mean(1)[::2];msr=sr//2  # 22050
n_fft=2048;hop=512
w=np.hanning(n_fft)
fr=[np.abs(np.fft.rfft(mono[i:i+n_fft]*w)) for i in range(0,len(mono)-n_fft,hop)]
S=np.array(fr);L=np.log1p(10*S)
flux=np.maximum(0,np.diff(L,axis=0)).sum(1);flux=(flux-flux.mean())/flux.std()
fps=msr/hop
ac=np.correlate(flux,flux,'full')[len(flux)-1:]
lo,hi=int(fps*60/190),int(fps*60/60)
lag=lo+np.argmax(ac[lo:hi]);bpm=60*fps/lag
# refine beat phase
period=lag;best=None
for ph in range(period):
    sc=flux[ph::period].sum()
    if best is None or sc>best[0]:best=(sc,ph)
ph=best[1];beats=np.arange(ph,len(flux),period)  # frame idx
# beat features: 48 log bands
edges=np.unique(np.geomspace(2,S.shape[1]-1,49).astype(int))
def feat(a,b):
    seg=L[a:b+1];return np.array([seg[:,edges[k]:edges[k+1]].mean() for k in range(len(edges)-1)])
F=np.array([feat(beats[k],beats[k+1]) for k in range(len(beats)-1)])
F=F-F.mean(1,keepdims=True)
nb=len(F);W=8;best=None;bsec=period*hop/msr;minb=int(np.ceil(12/bsec));maxb=int(30/bsec)
for i in range(4,nb-W-20):
    for j in range(i+minb,min(nb-W-8,i+maxb)):
        if (j-i)%4:continue
        d=np.linalg.norm(F[i:i+W]-F[j:j+W])+0.3*np.linalg.norm(F[i-4:i]-F[j-4:j])
        if best is None or d<best[0]:best=(d,i,j)
d,i,j=best
print(name,'bpm %.1f'%bpm,'beats',nb,'loop beats',i,'->',j,'dist %.2f'%d)
tb=lambda b:int(beats[b]*hop*2)  # frame->sample at 44.1k
a,b=tb(i),tb(j)
seglen=(b-a)/sr;total0=len(st)/sr
reps=min(3,max(1,int(np.ceil((target-total0)/seglen))))
xf=int(0.25*sr);ramp=np.linspace(0,1,xf)[:,None]
def join(x,y):
    c=x[-xf:]*np.cos(ramp*np.pi/2)+y[:xf]*np.sin(ramp*np.pi/2)
    return np.concatenate([x[:-xf],c,y[xf:]])
cur=st[:b+xf]
loop=st[a:b+xf]
for r in range(reps-1):cur=join(cur,loop)
# final jump to tail from loop point a
cur=join(cur,st[a:])
# end fade
fade=int(3.0*sr);cur[-fade:]*=np.linspace(1,0,fade)[:,None]
wf.write(out,sr,(np.clip(cur,-1,1)*32767).astype(np.int16))
print('out %.1fs reps %d seglen %.1fs'%(len(cur)/sr,reps,seglen))
