import React, { useState, useRef, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const backgroundUrls = [
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg1_kopzyv.jpg",
    alt: "Fundo com decoração 1"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg2_jbxz3p.jpg",
    alt: "Fundo com decoração 2"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg3_ibt1sq.jpg",
    alt: "Fundo com decoração 3"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg4_ys93rx.jpg",
    alt: "Fundo com decoração 4"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg5_wa3mg4.jpg",
    alt: "Fundo com decoração 5"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701224/bg6_jdvmnl.jpg",
    alt: "Fundo com decoração 6"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701225/bg7_dohk9j.jpg",
    alt: "Fundo com decoração 7"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701225/bg8_bhgqyk.jpg",
    alt: "Fundo com decoração 8"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701225/bg9_klttvi.jpg",
    alt: "Fundo com decoração 9"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701225/bg10_lm4t9j.jpg",
    alt: "Fundo com decoração 10"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701225/bg11_saceuk.jpg",
    alt: "Fundo com decoração 11"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701229/bg12_kfck1z.jpg",
    alt: "Fundo com decoração 12"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701230/bg13_dilrbd.jpg",
    alt: "Fundo com decoração 13"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701230/bg14_jlmc6g.jpg",
    alt: "Fundo com decoração 14"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701230/bg15_mcjubm.jpg",
    alt: "Fundo com decoração 15"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701230/bg16_ldjb8m.jpg",
    alt: "Fundo com decoração 16"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701230/bg17_wp6ois.jpg",
    alt: "Fundo com decoração 17"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701232/bg18_syja1o.jpg",
    alt: "Fundo com decoração 18"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701234/bg19_im8lgr.jpg",
    alt: "Fundo com decoração 19"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701234/bg20_y10zay.jpg",
    alt: "Fundo com decoração 20"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701234/bg21_xc1bva.jpg",
    alt: "Fundo com decoração 21"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701235/bg22_jee4re.jpg",
    alt: "Fundo com decoração 22"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701235/bg23_weucdp.jpg",
    alt: "Fundo com decoração 23"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701235/bg24_ez1qa0.jpg",
    alt: "Fundo com decoração 24"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701235/bg25_q0ehns.jpg",
    alt: "Fundo com decoração 25"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701240/bg26_w2iecs.jpg",
    alt: "Fundo com decoração 26"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701240/bg27_bwl1nm.jpg",
    alt: "Fundo com decoração 27"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701240/bg28_p7y0n6.jpg",
    alt: "Fundo com decoração 28"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701240/bg29_nuusrr.jpg",
    alt: "Fundo com decoração 29"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701240/bg30_oz8obh.jpg",
    alt: "Fundo com decoração 30"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701241/bg31_wdj6ps.jpg",
    alt: "Fundo com decoração 31"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701241/bg32_icdxlx.jpg",
    alt: "Fundo com decoração 32"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701241/bg33_c9ie5r.jpg",
    alt: "Fundo com decoração 33"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701241/bg34_ujamfc.jpg",
    alt: "Fundo com decoração 34"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701241/bg35_wmv482.jpg",
    alt: "Fundo com decoração 35"
  },
  {
    src: "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746701250/bg36_cp18kb.jpg",
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

// Primeiro, vamos criar um componente para o Modal LGPD
const LGPDModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Política de Privacidade</h2>
        <div className="text-left text-sm space-y-4 mb-6">
          <p>
            Nós utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência em nossos serviços.
            Ao utilizar nossos serviços, você concorda com tal monitoramento.
          </p>
          <p>
            Os dados coletados são utilizados apenas para melhorar a experiência do usuário e não são compartilhados com terceiros.
          </p>
          <p>
            Para mais informações, acesse nossa política de privacidade completa.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

// Adicionar parâmetros de otimização do Cloudinary
const optimizeImage = (url) => {
  // Adiciona parâmetros para otimização
  return url.replace('/upload/', '/upload/c_scale,w_800,q_auto,f_auto/');
};

// Atualizar o componente LazyImage para usar a URL otimizada
const LazyImage = ({ src, alt, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    console.error(`Erro ao carregar imagem: ${src}`);
  };
  
  return (
    <>
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 mb-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Carregando...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
          <div className="text-red-500">
            Erro ao carregar imagem
          </div>
        </div>
      )}
      <img
        src={optimizeImage(src)}
        alt={alt}
        className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

// Adicione este componente no início do arquivo, junto com os outros
const InaugurationPopup = ({ isOpen, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full relative">
        <button 
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg z-50"
        >
          ✕
        </button>
        
        {!imageLoaded && (
          <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Carregando...</span>
          </div>
        )}
        
        <img 
          src="https://res.cloudinary.com/ds6piwhzl/image/upload/v1746834031/Imagem_do_WhatsApp_de_2025-05-09_%C3%A0_s_18.24.39_c6931df2_hrx0qz.jpg" 
          alt="Inauguração Associação Amigo do Povo" 
          className={`w-full h-auto rounded-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ transition: 'opacity 0.3s' }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [date, setDate] = useState(new Date());
  const [bgIndex, setBgIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [loadedBackgrounds, setLoadedBackgrounds] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const cardRef = useRef();
  const fileInputRef = useRef();
  const [showLGPD, setShowLGPD] = useState(true);
  const [showLGPDModal, setShowLGPDModal] = useState(false);
  const [showInaugurationPopup, setShowInaugurationPopup] = useState(false);

  // Adicione esta função no início do componente App
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  // Modifique o useEffect inicial
  useEffect(() => {
    const loadInitialBackgrounds = async () => {
      // Reduzir para 5 imagens inicialmente
      const initialBatch = backgroundUrls.slice(0, 5);
      setLoadedBackgrounds(initialBatch);

      // Carregar o resto em background
      const loadRest = async () => {
        const nextBatch = backgroundUrls.slice(5);
        try {
          // Carregar em lotes menores
          for (let i = 0; i < nextBatch.length; i += 5) {
            const batch = nextBatch.slice(i, i + 5);
            await Promise.all(batch.map(bg => preloadImage(bg.src)));
            setLoadedBackgrounds(prev => [...prev, ...batch]);
            // Pequena pausa entre os lotes
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.error('Erro ao carregar mais imagens:', error);
        }
      };

      // Iniciar carregamento em background após 2 segundos
      setTimeout(loadRest, 2000);
    };
    loadInitialBackgrounds();
  }, []);

  // Modifique o loadMoreBackgrounds
  const loadMoreBackgrounds = useCallback(async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    
    const currentLength = loadedBackgrounds.length;
    const nextBatch = backgroundUrls.slice(
      currentLength,
      currentLength + 10 // Aumentado para 10 imagens por vez
    );
    
    if (nextBatch.length > 0) {
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        await Promise.all(nextBatch.map(bg => preloadImage(bg.src)));
        setLoadedBackgrounds(prev => [...prev, ...nextBatch]);
      } catch (error) {
        console.error('Erro ao carregar mais imagens:', error);
      }
    }
    
    setIsLoadingMore(false);
  }, [loadedBackgrounds.length, isLoadingMore]);

  // Modificar o trigger de carregamento
  useEffect(() => {
    if (bgIndex > loadedBackgrounds.length - 5 && loadedBackgrounds.length < backgroundUrls.length) {
      loadMoreBackgrounds();
    }
  }, [bgIndex, loadedBackgrounds.length, loadMoreBackgrounds]);

  // Modificar os handlers de navegação
  const handleNextBg = () => {
    setBgIndex((prev) => (prev + 1) % loadedBackgrounds.length);
  };

  const handlePrevBg = () => {
    setBgIndex((prev) => (prev - 1 + loadedBackgrounds.length) % loadedBackgrounds.length);
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
        setLoadedBackgrounds(prev => [...prev, newBackground]);
        setBgIndex(loadedBackgrounds.length); // Muda para a nova imagem
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
    if (loadedBackgrounds.length > 1) {
      setLoadedBackgrounds(prev => prev.filter((_, index) => index !== bgIndex));
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

    // Garantir que a imagem de fundo está carregada
    await new Promise((resolve) => {
      const img = cardRef.current.querySelector('img');
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
      }
    });

    // Capturar a imagem com configurações otimizadas
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true, // Importante para imagens de domínios diferentes
      allowTaint: true,
      backgroundColor: null,
      scale: 2, // Melhor qualidade
      logging: false,
      imageTimeout: 0, // Sem timeout para carregamento de imagem
    });
    
    // Restaurar os estilos originais
    Array.from(elements).forEach((el, index) => {
      el.setAttribute('class', originalStyles[index]);
    });

    // Exportar com melhor qualidade
    const link = document.createElement("a");
    link.download = "card.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
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

    // Garantir que a imagem de fundo está carregada
    await new Promise((resolve) => {
      const img = cardRef.current.querySelector('img');
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
      }
    });

    // Capturar a imagem com configurações otimizadas
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2,
      logging: false,
      imageTimeout: 0,
    });
    
    // Restaurar os estilos originais
    Array.from(elements).forEach((el, index) => {
      el.setAttribute('class', originalStyles[index]);
    });

    // Compartilhar com melhor qualidade
    canvas.toBlob(async (blob) => {
      try {
        const file = new File([blob], "card.jpg", { type: "image/jpeg" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Meu Card de Agendamento",
            text: "Olha só o meu card! 💅",
          });
        } else {
          // Fallback para WhatsApp Web se o compartilhamento nativo não for suportado
          const imageUrl = canvas.toDataURL("image/jpeg", 1.0);
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Olha só o meu card! 💅 ")}${encodeURIComponent(imageUrl)}`;
          window.open(whatsappUrl);
        }
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        alert('Não foi possível compartilhar a imagem. Tente salvar e compartilhar manualmente.');
      }
    }, 'image/jpeg', 1.0);
  };

  const getSpecialDatesForMonth = (date) => {
    const month = date.getMonth() + 1; // getMonth() retorna 0-11
    const datesForMonth = specialDates[month] || {};
    return Object.entries(datesForMonth)
      .sort(([dateA], [dateB]) => Number(dateA) - Number(dateB));
  };

  useEffect(() => {
    const lgpdAccepted = localStorage.getItem('lgpdAccepted');
    if (lgpdAccepted) {
      setShowLGPD(false);
    }
  }, []);

  const acceptLGPD = () => {
    localStorage.setItem('lgpdAccepted', 'true');
    setShowLGPD(false);
  };

  // Adicione este useEffect para controlar quando o popup aparece
  useEffect(() => {
    // Pré-carregar a imagem do popup após 30 segundos
    const preloadTimer = setTimeout(() => {
      const img = new Image();
      img.src = "https://res.cloudinary.com/ds6piwhzl/image/upload/v1746834031/Imagem_do_WhatsApp_de_2025-05-09_%C3%A0_s_18.24.39_c6931df2_hrx0qz.jpg";
    }, 30000);

    // Mostrar o popup após 60 segundos
    const showTimer = setTimeout(() => {
      setShowInaugurationPopup(true);
    }, 60000);

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(showTimer);
    };
  }, []);

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
        {loadedBackgrounds[bgIndex] && (
          <LazyImage
            src={loadedBackgrounds[bgIndex].src}
            alt={loadedBackgrounds[bgIndex].alt}
          />
        )}
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

      {/* LGPD Banner */}
      {showLGPD && (
        <div className="fixed bottom-16 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              Este site utiliza cookies para melhorar sua experiência.{" "}
              <button 
                onClick={() => setShowLGPDModal(true)}
                className="underline hover:text-blue-300"
              >
                Saiba mais
              </button>
            </p>
            <button
              onClick={acceptLGPD}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      {/* Adicione o popup antes do footer */}
      <InaugurationPopup 
        isOpen={showInaugurationPopup} 
        onClose={() => setShowInaugurationPopup(false)} 
      />

      {/* Footer */}
      <footer className="mt-8 pt-8 border-t text-sm text-gray-600">
        {/* Você também pode gostar */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Você também pode gostar</h3>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://calculadora-de-vale-transporte-tan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">🚌</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Calculadora de Vale Transporte</h4>
                <p className="text-sm text-gray-600">
                  Calcule facilmente o valor do seu vale transporte
                </p>
              </div>
            </a>

            <a 
              href="https://mercado-calculo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Calculadora de Taxas</h4>
                <p className="text-sm text-gray-600">
                  Calcule valores de parcelas e taxas de mercado
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Copyright e Política de Privacidade */}
        <div className="flex flex-col gap-2">
          <p>© 2024 Agenda Card - Todos os direitos reservados</p>
          <button 
            onClick={() => setShowLGPDModal(true)}
            className="text-blue-500 hover:underline"
          >
            Política de Privacidade
          </button>
        </div>
      </footer>

      {/* LGPD Modal */}
      <LGPDModal 
        isOpen={showLGPDModal} 
        onClose={() => setShowLGPDModal(false)} 
      />
    </div>
  );
} 