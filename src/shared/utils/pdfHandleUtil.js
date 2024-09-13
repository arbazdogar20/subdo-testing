import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Register fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateAndDownloadPDF = (documentDefinition, fileName = 'document.pdf') => {
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  pdfDocGenerator.getBuffer((buffer) => {
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  });
};

export const getBase64ImageFromURL = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateAutoArray = (length) => {
  return Array(length).fill('auto');
};

export const generateTopTableHeaders = (headers, defaultStyle, specialHeaders = [], specialStyles = []) => {
  return headers.map((header) => {
    const index = specialHeaders.indexOf(header);
    const style = index !== -1 ? specialStyles[index] : defaultStyle;
    return { text: header, style };
  });
};

export const generateTableData = (data, styles) => {
  return data.map((item, index) => {
    const style = typeof styles[index] === 'object' ? styles[index] : { style: styles[index] };
    return { text: item, ...style };
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};