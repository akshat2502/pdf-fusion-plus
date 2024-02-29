import PDFMerger from 'pdf-merger-js';

const mergepdfs= async (p1,p2) => {
const merger = new PDFMerger();

  await merger.add(p1);  
  await merger.add(p2);

 const d= new Date().getTime()
 await merger.save(`public/${d}.pdf`);  
 return d;
};

export default mergepdfs;
