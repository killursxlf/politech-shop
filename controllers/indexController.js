exports.renderMainPage = (req, res) => {
    const topProducts = [
      { article: "H754LLK", image: 'images/shoes/H754LLK.jpg', name: 'Кросівки теплі', description: 'Зручні теплі повсякденні кросівки чорного кольору, підійдуть для жінок та чоловіків', price: '4300.00' },
      { article: "H754LFN", image: 'images/shoes/H754LFN.jpg', name: 'Кросівки теплі', description: 'Зручні теплі повсякденні кросівки темно-синього кольору, підійдуть для жінок та чоловіків', price: '4100.00' },
      { article: "MP43522BK", image: 'images/trousers/MP43522BK.jpg', name: 'Теплі бавовняні спортивні штани', description: 'Бавовняні теплі спортивні штани чорного кольору, підійдуть для жінок та чоловіків', price: '2700.00' },
      { article: "MT43524BK", image: 'images/hoodies/MT43524BK.jpg', name: 'Бавовняне тепле спортивне худі', description: 'Бавовняне тепле спортивне худі чорного кольору, підійде для жінок та чоловіків', price: '2900.00' }
    ];
  
    res.render('main_page', { 
      title: 'Магазин Політехнік', 
      products: topProducts 
    });
  };
  