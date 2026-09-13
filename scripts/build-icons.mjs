import sharp from 'sharp';
import { readFile,writeFile } from 'node:fs/promises';
const svg=await readFile('public/icon.svg');
for(const size of [16,32,48,192,512])await sharp(svg).resize(size,size).png().toFile(`public/icon-${size}.png`);
const safe=await sharp(svg).resize(340,340).png().toBuffer();
await sharp({create:{width:512,height:512,channels:4,background:'#0066cc'}}).composite([{input:safe,left:86,top:86}]).png().toFile('public/icon-maskable-512.png');
// ICO directory containing PNG entries is supported by modern desktop browsers.
const icons=await Promise.all([16,32,48].map(s=>readFile(`public/icon-${s}.png`)));
const header=Buffer.alloc(6+16*icons.length);header.writeUInt16LE(1,2);header.writeUInt16LE(icons.length,4);let offset=header.length;
icons.forEach((b,i)=>{const start=6+i*16;header[start]=[16,32,48][i];header[start+1]=[16,32,48][i];header.writeUInt16LE(1,start+4);header.writeUInt16LE(32,start+6);header.writeUInt32LE(b.length,start+8);header.writeUInt32LE(offset,start+12);offset+=b.length;});
await writeFile('public/favicon.ico',Buffer.concat([header,...icons]));
console.log('Generated 16/32/48 px favicon and 192/512 px install icons.');
