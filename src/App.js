import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import bg1 from './assets/backgrounds/bg1.jpg';
import bg2 from './assets/backgrounds/bg2.jpg';
import bg3 from './assets/backgrounds/bg3.jpg';
import bg4 from './assets/backgrounds/bg4.jpg';
import bg5 from './assets/backgrounds/bg5.jpg';
import bg6 from './assets/backgrounds/bg6.jpg';
import bg7 from './assets/backgrounds/bg7.jpg';
import bg8 from './assets/backgrounds/bg8.jpg';
import bg9 from './assets/backgrounds/bg9.jpg';
import bg10 from './assets/backgrounds/bg10.jpg';
import bg11 from './assets/backgrounds/bg11.jpg';
import bg12 from './assets/backgrounds/bg12.jpg';
import bg13 from './assets/backgrounds/bg13.jpg';
import bg14 from './assets/backgrounds/bg14.jpg';
import bg15 from './assets/backgrounds/bg15.jpg';
import bg16 from './assets/backgrounds/bg16.jpg';
import bg17 from './assets/backgrounds/bg17.jpg';
import bg18 from './assets/backgrounds/bg18.jpg';
import bg19 from './assets/backgrounds/bg19.jpg';
import bg20 from './assets/backgrounds/bg20.jpg';
import bg21 from './assets/backgrounds/bg21.jpg';
import bg22 from './assets/backgrounds/bg22.jpg';
import bg23 from './assets/backgrounds/bg23.jpg';
import bg24 from './assets/backgrounds/bg24.jpg';
import bg25 from './assets/backgrounds/bg25.jpg';
import bg26 from './assets/backgrounds/bg26.jpg';
import bg27 from './assets/backgrounds/bg27.jpg';
import bg28 from './assets/backgrounds/bg28.jpg';
import bg29 from './assets/backgrounds/bg29.jpg';
import bg30 from './assets/backgrounds/bg30.jpg';
import bg31 from './assets/backgrounds/bg31.jpg';
import bg32 from './assets/backgrounds/bg32.jpg';
import bg33 from './assets/backgrounds/bg33.jpg';
import bg34 from './assets/backgrounds/bg34.jpg';
import bg35 from './assets/backgrounds/bg35.jpg';
import bg36 from './assets/backgrounds/bg36.jpg';

const defaultBackgrounds = [
  {
    src: bg1,
    alt: "Fundo rosa com decoração"
  },
  {
    src: bg2,
    alt: "Fundo dourado com padrão"
  },
  {
    src: bg3,
    alt: "Fundo verde com flores"
  },
  {
    src: bg4,
    alt: "Fundo com decoração 4"
  },
  {
    src: bg5,
    alt: "Fundo com decoração 5"
  },
  {
    src: bg6,
    alt: "Fundo com decoração 6"
  },
  {
    src: bg7,
    alt: "Fundo com decoração 7"
  },
  {
    src: bg8,
    alt: "Fundo com decoração 8"
  },
  {
    src: bg9,
    alt: "Fundo com decoração 9"
  },
  {
    src: bg10,
    alt: "Fundo com decoração 10"
  },
  {
    src: bg11,
    alt: "Fundo com decoração 11"
  },
  {
    src: bg12,
    alt: "Fundo com decoração 12"
  },
  {
    src: bg13,
    alt: "Fundo com decoração 13"
  },
  {
    src: bg14,
    alt: "Fundo com decoração 14"
  },
  {
    src: bg15,
    alt: "Fundo com decoração 15"
  },
  {
    src: bg16,
    alt: "Fundo com decoração 16"
  },
  {
    src: bg17,
    alt: "Fundo com decoração 17"
  },
  {
    src: bg18,
    alt: "Fundo com decoração 18"
  },
  {
    src: bg19,
    alt: "Fundo com decoração 19"
  },
  {
    src: bg20,
    alt: "Fundo com decoração 20"
  },
  {
    src: bg21,
    alt: "Fundo com decoração 21"
  },
  {
    src: bg22,
    alt: "Fundo com decoração 22"
  },
  {
    src: bg23,
    alt: "Fundo com decoração 23"
  },
  {
    src: bg24,
    alt: "Fundo com decoração 24"
  },
  {
    src: bg25,
    alt: "Fundo com decoração 25"
  },
  {
    src: bg26,
    alt: "Fundo com decoração 26"
  },
  {
    src: bg27,
    alt: "Fundo com decoração 27"
  },
  {
    src: bg28,
    alt: "Fundo com decoração 28"
  },
  {
    src: bg29,
    alt: "Fundo com decoração 29"
  },
  {
    src: bg30,
    alt: "Fundo com decoração 30"
  },
  {
    src: bg31,
    alt: "Fundo com decoração 31"
  },
  {
    src: bg32,
    alt: "Fundo com decoração 32"
  },
  {
    src: bg33,
    alt: "Fundo com decoração 33"
  },
  {
    src: bg34,
    alt: "Fundo com decoração 34"
  },
  {
    src: bg35,
    alt: "Fundo com decoração 35"
  },
  {
    src: bg36,
    alt: "Fundo com decoração 36"
  }
];

const specialDates = {
  1: { // Janeiro
    1: "Ano Novo 🎊",
    6: "Dia de Reis 👑"
  },
  2: { // Fevereiro
    14: "Dia dos Namorados (EUA) ❤️",
    // Carnaval é móvel
  },
  3: { // Março
    8: "Dia Internacional da Mulher 👩",
    19: "Dia de São José 🙏"
  },
  4: { // Abril
    21: "Tiradentes 🇧🇷",
    22: "Descobrimento do Brasil 🗺️"
  },
  5: { // Maio
    1: "Dia do Trabalho 💪",
    14: "Dia das Mães 🌹"
  },
  6: { // Junho
    12: "Dia dos Namorados 💑",
    24: "São João 🎊"
  },
  7: { // Julho
    9: "Dia da Revolução Constitucionalista 📜"
  },
  8: { // Agosto
    13: "Dia dos Pais 👨"
  },
  9: { // Setembro
    7: "Independência do Brasil 🇧🇷"
  },
  10: { // Outubro
    12: "Nossa Senhora Aparecida 🙏",
    15: "Dia do Professor 📚"
  },
  11: { // Novembro
    2: "Finados 🕯️",
    15: "Proclamação da República 🇧🇷"
  },
  12: { // Dezembro
    25: "Natal 🎄",
    31: "Véspera de Ano Novo 🎊"
  }
};

export default function App() {
  const [date, setDate] = useState(new Date());
  const [bgIndex, setBgIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [backgrounds, setBackgrounds] = useState(defaultBackgrounds);
  const cardRef = useRef();
  const fileInputRef = useRef();

  const handleNextBg = () => {
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const handlePrevBg = () => {
    setBgIndex((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBackground = {
          src: e.target.result,
          alt: file.name
        };
        setBackgrounds(prev => [...prev, newBackground]);
        setBgIndex(backgrounds.length); // Muda para a nova imagem
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione uma imagem válida');
    }
    event.target.value = ''; // Limpa o input para permitir o mesmo arquivo novamente
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const removeCurrentBackground = () => {
    if (backgrounds.length > 1) {
      setBackgrounds(prev => prev.filter((_, index) => index !== bgIndex));
      setBgIndex(prev => prev > 0 ? prev - 1 : 0);
    } else {
      alert('Você precisa manter pelo menos um fundo!');
    }
  };

  const exportAsImage = async () => {
    const elements = cardRef.current.getElementsByClassName('bg-[#9aad2f]/50');
    
    // Guardar os estilos originais
    const originalStyles = [];
    Array.from(elements).forEach(el => {
      originalStyles.push(el.getAttribute('class'));
      el.classList.remove('bg-[#9aad2f]/50', 'backdrop-blur-sm');
      el.classList.add('bg-[#9aad2f]');
    });

    // Capturar a imagem
    const canvas = await html2canvas(cardRef.current);
    
    // Restaurar os estilos originais
    Array.from(elements).forEach((el, index) => {
      el.setAttribute('class', originalStyles[index]);
    });

    const link = document.createElement("a");
    link.download = "card.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  const shareViaWhatsApp = async () => {
    const elements = cardRef.current.getElementsByClassName('bg-[#9aad2f]/50');
    
    // Guardar os estilos originais
    const originalStyles = [];
    Array.from(elements).forEach(el => {
      originalStyles.push(el.getAttribute('class'));
      el.classList.remove('bg-[#9aad2f]/50', 'backdrop-blur-sm');
      el.classList.add('bg-[#9aad2f]');
    });

    // Capturar a imagem
    const canvas = await html2canvas(cardRef.current);
    
    // Restaurar os estilos originais
    Array.from(elements).forEach((el, index) => {
      el.setAttribute('class', originalStyles[index]);
    });

    canvas.toBlob((blob) => {
      const file = new File([blob], "card.jpg", { type: "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "Meu Card de Agendamento",
          text: "Olha só o meu card! 💅",
        });
      } else {
        alert("Compartilhamento não suportado neste navegador.");
      }
    });
  };

  const getSpecialDatesForMonth = (date) => {
    const month = date.getMonth() + 1; // getMonth() retorna 0-11
    const datesForMonth = specialDates[month] || {};
    return Object.entries(datesForMonth)
      .sort(([dateA], [dateB]) => Number(dateA) - Number(dateB));
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      {/* Barra Social */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-center items-center gap-4 z-50">
        <a 
          href="https://wa.me/5562982162844" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-600"
        >
          <span>📱 WhatsApp</span>
        </a>
        <a 
          href="https://instagram.com/agendacard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600"
        >
          <span>📸 Instagram</span>
        </a>
        <a 
          href="https://facebook.com/agendacard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          <span>👍 Facebook</span>
        </a>
        <a 
          href="https://t.me/agendacard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500"
        >
          <span>✈️ Telegram</span>
        </a>
      </div>

      {/* Banner de Anúncio */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">Anuncie Aqui</h2>
        <a 
          href="https://wa.me/5562982162844" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <span>Fale Conosco</span>
          <span>📱</span>
        </a>
      </div>

      {/* Input de Mensagem */}
      <input
        className="w-full mb-4 p-3 border rounded-lg shadow"
        type="text"
        placeholder="Escreva algo no card..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Navegação de Fundos */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button onClick={handlePrevBg} className="px-4 py-2 bg-pink-300 rounded-lg">◀</button>
        <span className="text-gray-700">Escolha o fundo</span>
        <button onClick={handleNextBg} className="px-4 py-2 bg-pink-300 rounded-lg">▶</button>
      </div>

      {/* Card Preview */}
      <div ref={cardRef} className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg mb-4">
        <img
          src={backgrounds[bgIndex].src}
          alt={backgrounds[bgIndex].alt}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 flex flex-col items-center h-full text-white">
          <div className="w-full text-center mt-[280px]">
            <div className="relative z-50 bg-[#9aad2f]/50 backdrop-blur-sm text-white inline-flex items-center justify-center w-3/4 px-4 py-3 rounded-lg mx-auto">
              <h2 className="text-3xl font-bold uppercase">
                {date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()} {date.getFullYear()}
              </h2>
            </div>
          </div>

          <div className="bg-[#9aad2f]/50 backdrop-blur-sm rounded-lg p-6 w-full max-w-xs mt-8">
            <h3 className="text-5xl font-bold mb-2">
              {date.getDate().toString().padStart(2, '0')}
            </h3>
            <p className="text-2xl capitalize">
              {date.toLocaleString('pt-BR', { weekday: 'long' })}
            </p>
          </div>

          <div className="w-full bg-[#9aad2f]/50 backdrop-blur-sm rounded-lg p-4 mt-auto mb-8">
            <p className="text-xl font-semibold">
              {message || "Seu horário está marcado! 💅"}
            </p>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={exportAsImage}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <span>💾</span> Salvar JPG
        </button>
        <button
          onClick={shareViaWhatsApp}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <span>📱</span> Compartilhar
        </button>
      </div>

      {/* Calendário */}
      <Calendar 
        onChange={setDate} 
        value={date}
        locale="pt-BR"
        className="mx-auto mb-4"
      />

      {/* Lista de datas especiais */}
      <div className="bg-pink-50 rounded-lg p-4 text-left">
        <h3 className="font-bold text-pink-800 mb-2">
          Datas Especiais de {format(date, "MMMM", { locale: ptBR })}:
        </h3>
        <ul className="space-y-1">
          {getSpecialDatesForMonth(date).map(([day, event]) => (
            <li 
              key={day}
              className="text-gray-700 flex items-center gap-2"
            >
              <span className="font-semibold">{day}</span>
              <span>-</span>
              <span>{event}</span>
            </li>
          ))}
          {getSpecialDatesForMonth(date).length === 0 && (
            <li className="text-gray-500 italic">
              Nenhuma data especial neste mês
            </li>
          )}
        </ul>
      </div>
    </div>
  );
} 