// Criar um canvas temporário para gerar o favicon
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

// Desenhar um fundo gradiente
const gradient = ctx.createLinearGradient(0, 0, 32, 32);
gradient.addColorStop(0, '#9aad2f');
gradient.addColorStop(1, '#7a8d1f');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 32, 32);

// Desenhar um "A" estilizado
ctx.fillStyle = 'white';
ctx.font = 'bold 24px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('A', 16, 16);

// Exportar como .ico
canvas.toBlob(blob => {
  const link = document.createElement('a');
  link.download = 'favicon.ico';
  link.href = URL.createObjectURL(blob);
  link.click();
}); 