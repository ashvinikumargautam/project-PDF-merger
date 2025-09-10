import PDFMerger from 'pdf-merger-js';

export async function mergePdf(p1, p2) {
  const merger = new PDFMerger();
  await merger.add(p1); // Use the actual filenames/paths passed
  await merger.add(p2);
  let d =new Date().getTime()
  await merger.save(`public/${d}.pdf`);
}
