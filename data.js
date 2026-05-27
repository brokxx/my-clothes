// MY CLOTHES — product catalog + placeholder palettes
// Each product gets a duotone palette so the placeholders look intentional/editorial.

window.PRODUCTS = [
  // ============ MAILLOTS DE FOOT (T-shirts > maillots-foot) ============
  // 33 maillots issus du listing USFans 2023/24 Season Series
  { id: 'j01', name: 'Liverpool Home 22/23',           category: 'tees', subcategory: 'maillots-foot', rank: 20, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 4, M: 8, L: 6, XL: 5, XXL: 2 }, palette: ['#c8102e','#8b0000','#ffffff'], glyph: 'LFC', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j01.jpg' },
  { id: 'j02', name: 'Liverpool Away 23/24',           category: 'tees', subcategory: 'maillots-foot', rank: 21, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 1 }, palette: ['#7c4afc','#3a1c8a','#ffffff'], glyph: 'LFC', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j02.jpg' },
  { id: 'j03', name: 'Manchester United Home 23/24',   category: 'tees', subcategory: 'maillots-foot', rank: 22, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 5, M: 8, L: 7, XL: 5, XXL: 2 }, palette: ['#da291c','#7a0a0a','#ffe500'], glyph: 'MUN', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j03.jpg' },
  { id: 'j04', name: 'Real Madrid Away 23/24',         category: 'tees', subcategory: 'maillots-foot', rank: 23, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#3e1d6d','#1b0d3a','#ff6b00'], glyph: 'RMA', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j04.jpg' },
  { id: 'j05', name: 'Real Madrid Special Edition I',  category: 'tees', subcategory: 'maillots-foot', rank: 24, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 4, XL: 3, XXL: 1 }, palette: ['#e7d4a4','#bfa57a','#2b1e0e'], glyph: 'RMA', drop: 'SS26', materials: 'Édition limitée — Polyester premium', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j05.jpg' },
  { id: 'j06', name: 'Real Madrid Special Edition II', category: 'tees', subcategory: 'maillots-foot', rank: 25, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 3, XL: 3, XXL: 1 }, palette: ['#0a1f3d','#040d20','#c9a14a'], glyph: 'RMA', drop: 'SS26', materials: 'Édition limitée — Polyester premium', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j06.jpg' },
  { id: 'j07', name: 'Real Madrid CL Final 23/24',     category: 'tees', subcategory: 'maillots-foot', rank: 26, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#ffffff','#dcdcdc','#3e1d6d'], glyph: 'RMA', drop: 'SS26', materials: 'Maillot Finale Wembley — Polyester premium', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j07.jpg' },
  { id: 'j08', name: 'AC Milan Home 23/24',            category: 'tees', subcategory: 'maillots-foot', rank: 27, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 4, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#a4001e','#5a0010','#000000'], glyph: 'ACM', drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j08.jpg' },
  { id: 'j09', name: 'Tottenham Home 23/24',           category: 'tees', subcategory: 'maillots-foot', rank: 28, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 3, XXL: 1 }, palette: ['#ffffff','#e8e8e8','#001c58'], glyph: 'TOT', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j09.jpg' },
  { id: 'j10', name: 'Manchester City Away 23/24',     category: 'tees', subcategory: 'maillots-foot', rank: 29, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#0a0a0a','#2a2a2a','#6cabdd'], glyph: 'MCI', drop: 'SS26', materials: 'Polyester recyclé Puma Ultraweave', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j10.jpg' },
  { id: 'j11', name: 'Ajax Home 23/24',                category: 'tees', subcategory: 'maillots-foot', rank: 30, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#ffffff','#e8e8e8','#d2122e'], glyph: 'AJX', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j11.jpg' },
  { id: 'j12', name: 'AS Roma Home 23/24',             category: 'tees', subcategory: 'maillots-foot', rank: 31, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#8b0000','#5a0010','#f4d35e'], glyph: 'ROM', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j12.jpg' },
  { id: 'j13', name: 'Napoli Away 23/24',              category: 'tees', subcategory: 'maillots-foot', rank: 32, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#f4f1ea','#bdb3a0','#1ba1e2'], glyph: 'NAP', drop: 'SS26', materials: 'Polyester recyclé EA7', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j13.jpg' },
  { id: 'j14', name: 'Borussia Dortmund Away 23/24',   category: 'tees', subcategory: 'maillots-foot', rank: 33, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#0a0a0a','#1c1c1c','#fde100'], glyph: 'BVB', drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j14.jpg' },
  { id: 'j15', name: 'Manchester United Away 23/24',   category: 'tees', subcategory: 'maillots-foot', rank: 34, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 4, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#f4f1ea','#bdb3a0','#da291c'], glyph: 'MUN', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j15.jpg' },
  { id: 'j16', name: 'Bayern Munich Third 23/24',      category: 'tees', subcategory: 'maillots-foot', rank: 35, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#0a4d2a','#062f1a','#ffffff'], glyph: 'FCB', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j16.jpg' },
  { id: 'j17', name: 'Al-Hilal Away 23/24',            category: 'tees', subcategory: 'maillots-foot', rank: 36, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a47c2','#062a78','#ffffff'], glyph: 'HIL', drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j17.jpg' },
  { id: 'j18', name: 'AC Milan Third 23/24',           category: 'tees', subcategory: 'maillots-foot', rank: 37, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 4, XL: 3, XXL: 1 }, palette: ['#1a1a1a','#2c2c2c','#a4001e'], glyph: 'ACM', drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j18.jpg' },
  { id: 'j19', name: 'Al-Hilal Home 23/24',            category: 'tees', subcategory: 'maillots-foot', rank: 38, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 3, XL: 3, XXL: 1 }, palette: ['#ffffff','#dcdcdc','#0a47c2'], glyph: 'HIL', drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j19.jpg' },
  { id: 'j20', name: 'Chelsea Home 23/24',             category: 'tees', subcategory: 'maillots-foot', rank: 39, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 3, XXL: 2 }, palette: ['#034694','#011f4b','#ffffff'], glyph: 'CHE', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j20.jpg' },
  { id: 'j21', name: 'Inter Milan Away 23/24',         category: 'tees', subcategory: 'maillots-foot', rank: 40, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#ffffff','#e8e8e8','#0a4d96'], glyph: 'INT', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j21.jpg' },
  { id: 'j22', name: 'AS Roma Special Edition 23/24',  category: 'tees', subcategory: 'maillots-foot', rank: 41, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#3a0a0a','#1c0505','#ffd700'], glyph: 'ROM', drop: 'SS26', materials: 'Édition limitée — Polyester premium', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j22.jpg' },
  { id: 'j23', name: 'AS Roma Away 23/24',             category: 'tees', subcategory: 'maillots-foot', rank: 42, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#ffffff','#e8e8e8','#8b0000'], glyph: 'ROM', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j23.jpg' },
  { id: 'j24', name: 'Bayer Leverkusen Home 23/24',    category: 'tees', subcategory: 'maillots-foot', rank: 43, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 2 }, palette: ['#1a1a1a','#2c2c2c','#e30613'], glyph: 'B04', drop: 'SS26', materials: 'Polyester recyclé Castore', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j24.jpg' },
  { id: 'j25', name: 'Flamengo Special Edition 23/24', category: 'tees', subcategory: 'maillots-foot', rank: 44, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a0a0a','#1c1c1c','#c10018'], glyph: 'FLA', drop: 'SS26', materials: 'Édition limitée Adidas — iridescent', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j25.jpg' },
  { id: 'j26', name: 'Bayern Munich Oktoberfest 23/24',category: 'tees', subcategory: 'maillots-foot', rank: 45, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 2, XL: 2, XXL: 1 }, palette: ['#7c1a1a','#3a0a0a','#f4d35e'], glyph: 'FCB', drop: 'SS26', materials: 'Édition spéciale Oktoberfest', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j26.jpg' },
  { id: 'j27', name: 'Real Madrid Third 23/24',        category: 'tees', subcategory: 'maillots-foot', rank: 46, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 2 }, palette: ['#f4d35e','#bfa547','#1a1a1a'], glyph: 'RMA', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j27.jpg' },
  { id: 'j28', name: 'Borussia Dortmund Anniversary',  category: 'tees', subcategory: 'maillots-foot', rank: 47, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#fde100','#c9b300','#0a0a0a'], glyph: 'BVB', drop: 'SS26', materials: 'Édition 125e anniversaire — Puma', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j28.jpg' },
  { id: 'j29', name: 'Manchester City Third 23/24',    category: 'tees', subcategory: 'maillots-foot', rank: 48, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#3a0a0a','#1c0505','#f0e4c8'], glyph: 'MCI', drop: 'SS26', materials: 'Polyester recyclé Puma Ultraweave', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j29.jpg' },
  { id: 'j30', name: 'PSG Fourth 23/24',               category: 'tees', subcategory: 'maillots-foot', rank: 49, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#1a1a1a','#2c2c2c','#d4af37'], glyph: 'PSG', drop: 'SS26', materials: 'Quatrième maillot — Nike Dri-FIT ADV', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j30.jpg' },
  { id: 'j31', name: 'PSG Third 23/24',                category: 'tees', subcategory: 'maillots-foot', rank: 50, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 4, XL: 3, XXL: 2 }, palette: ['#f0eadf','#bdb3a0','#001233'], glyph: 'PSG', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j31.jpg' },
  { id: 'j32', name: 'Inter Milan Home 23/24',         category: 'tees', subcategory: 'maillots-foot', rank: 51, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#0a3978','#062250','#1a1a1a'], glyph: 'INT', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j32.jpg' },
  { id: 'j33', name: 'Olympique Marseille Home 23/24', category: 'tees', subcategory: 'maillots-foot', rank: 52, price: 25,  sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 5, L: 4, XL: 3, XXL: 2 }, palette: ['#ffffff','#e8e8e8','#2cb6d8'], glyph: 'OM',  drop: 'SS26', materials: 'Polyester recyclé Puma DryCELL', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j33.jpg' },
  { id: 'j34', name: 'Al-Nassr Away 23/24',            category: 'tees', subcategory: 'maillots-foot', rank: 53, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#1a1a1a','#2c2c2c','#f4d35e'], glyph: 'NSR', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j34.jpg' },

  // ============ JERSEYS — Batch USFans (22 nouveaux) ============
  { id: 'j35', name: 'Manchester United Away (vert) 23/24', category: 'tees', subcategory: 'maillots-foot', rank: 54, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#1f3b2e','#0f2519','#ffffff'], glyph: 'MUN', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j35.jpg' },
  { id: 'j36', name: 'Tottenham Away 22/23',           category: 'tees', subcategory: 'maillots-foot', rank: 55, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#2032a0','#101a55','#d8ff3a'], glyph: 'TOT', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j36.jpg' },
  { id: 'j37', name: 'Real Madrid Black & Gold',       category: 'tees', subcategory: 'maillots-foot', rank: 56, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a0a0a','#1c1c1c','#d4af37'], glyph: 'RMA', drop: 'SS26', materials: 'Édition limitée — Polyester premium', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j37.jpg' },
  { id: 'j38', name: 'PSG Home 19/20 — Vintage',       category: 'tees', subcategory: 'maillots-foot', rank: 57, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 4, L: 4, XL: 3, XXL: 1 }, palette: ['#0a1644','#050a22','#d62828'], glyph: 'PSG', drop: 'SS26', materials: 'Réédition vintage — Polyester', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j38.jpg' },
  { id: 'j39', name: 'Atlético Mineiro Special Map',   category: 'tees', subcategory: 'maillots-foot', rank: 58, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#e7d4a4','#bfa57a','#1c1c1c'], glyph: 'CAM', drop: 'SS26', materials: 'Édition spéciale Le Coq Sportif', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j39.jpg' },
  { id: 'j40', name: 'Barcelona Home 22/23',           category: 'tees', subcategory: 'maillots-foot', rank: 59, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#0a2c5c','#040f2e','#a50044'], glyph: 'FCB', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j40.jpg' },
  { id: 'j41', name: 'Ajax Away 22/23',                category: 'tees', subcategory: 'maillots-foot', rank: 60, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#101a35','#070d1c','#c9a14a'], glyph: 'AJX', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j41.jpg' },
  { id: 'j42', name: 'Manchester City Home 23/24',     category: 'tees', subcategory: 'maillots-foot', rank: 61, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#6cabdd','#3d7da8','#ffffff'], glyph: 'MCI', drop: 'SS26', materials: 'Polyester recyclé Puma Ultraweave', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j42.jpg' },
  { id: 'j43', name: 'Manchester United Third 23/24',  category: 'tees', subcategory: 'maillots-foot', rank: 62, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#f4f1ea','#e0d7c4','#7a1e2c'], glyph: 'MUN', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j43.jpg' },
  { id: 'j44', name: 'PSG Édition Tricolore',          category: 'tees', subcategory: 'maillots-foot', rank: 63, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a0a0a','#1c1c1c','#d62828'], glyph: 'PSG', drop: 'SS26', materials: 'Édition limitée — Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j44.jpg' },
  { id: 'j45', name: 'Real Madrid Home 22/23',         category: 'tees', subcategory: 'maillots-foot', rank: 64, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#ffffff','#dcdcdc','#0a1f3d'], glyph: 'RMA', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j45.jpg' },
  { id: 'j46', name: 'Chelsea Away 22/23',             category: 'tees', subcategory: 'maillots-foot', rank: 65, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#f4f1ea','#cdd9e0','#5fb3d6'], glyph: 'CHE', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j46.jpg' },
  { id: 'j47', name: 'Inter Milan Third 21/22',        category: 'tees', subcategory: 'maillots-foot', rank: 66, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a0a0a','#1c1c1c','#5fb968'], glyph: 'INT', drop: 'SS26', materials: 'Édition Inter Crypto — Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j47.jpg' },
  { id: 'j48', name: 'Liverpool Édition Air',          category: 'tees', subcategory: 'maillots-foot', rank: 67, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#dcdcdc','#1c1c1c','#e84848'], glyph: 'LFC', drop: 'SS26', materials: 'Édition spéciale Nike Air', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j48.jpg' },
  { id: 'j49', name: 'Arsenal Home 22/23',             category: 'tees', subcategory: 'maillots-foot', rank: 68, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 7, L: 6, XL: 4, XXL: 2 }, palette: ['#ef0107','#a3000c','#ffffff'], glyph: 'ARS', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j49.jpg' },
  { id: 'j50', name: 'PSG Away 22/23',                 category: 'tees', subcategory: 'maillots-foot', rank: 69, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#d3d3d3','#a8a8a8','#0a0a0a'], glyph: 'PSG', drop: 'SS26', materials: 'Polyester recyclé Nike Dri-FIT', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j50.jpg' },
  { id: 'j51', name: 'Real Madrid Third 14/15 — Pink', category: 'tees', subcategory: 'maillots-foot', rank: 70, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#e84a7e','#a82c5c','#ffffff'], glyph: 'RMA', drop: 'SS26', materials: 'Réédition vintage Adidas', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j51.jpg' },
  { id: 'j52', name: 'Barcelona Final Roma 2009',      category: 'tees', subcategory: 'maillots-foot', rank: 71, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#0a2c5c','#a50044','#fcd116'], glyph: 'FCB', drop: 'SS26', materials: 'Réédition finale Champions League', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j52.jpg' },
  { id: 'j53', name: 'Barcelona Away 2009 — Yellow',   category: 'tees', subcategory: 'maillots-foot', rank: 72, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#f5d000','#c4a300','#a50044'], glyph: 'FCB', drop: 'SS26', materials: 'Réédition vintage Nike', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j53.jpg' },
  { id: 'j54', name: 'Santos FC Vintage Pelé',         category: 'tees', subcategory: 'maillots-foot', rank: 73, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 1, M: 3, L: 3, XL: 2, XXL: 1 }, palette: ['#ffffff','#dcdcdc','#c0a060'], glyph: 'SAN', drop: 'SS26', materials: 'Réédition rétro Nike', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j54.jpg' },
  { id: 'j55', name: 'Argentina Copa America',         category: 'tees', subcategory: 'maillots-foot', rank: 74, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 3, M: 6, L: 5, XL: 4, XXL: 2 }, palette: ['#75aadb','#ffffff','#fcd116'], glyph: 'ARG', drop: 'SS26', materials: 'Polyester recyclé Adidas AEROREADY', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j55.jpg' },
  { id: 'j56', name: 'Barcelona Home 2009 — Retro',    category: 'tees', subcategory: 'maillots-foot', rank: 75, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#0a2c5c','#a50044','#fcd116'], glyph: 'FCB', drop: 'SS26', materials: 'Réédition vintage Nike', cut: 'Standard', made: 'Thailand', image: 'uploads/jerseys/j56.jpg' },

  // ============ SHORTS (catégorie shorts) ============
  // 2 modèles multi-couleurs, sélecteur PDP (Modèle B)
  {
    id: 'sh01', name: 'Polo Ralph Lauren Shorts', category: 'shorts', subcategory: 'casual', rank: 60, price: 60,
    sizes: ['S','M','L','XL','2XL','3XL'], stock: { S: 6, M: 12, L: 14, XL: 10, '2XL': 5, '3XL': 3 },
    palette: ['#0a0a0a','#1a1a1a','#cc0033'], glyph: 'PRL', drop: 'SS26',
    materials: 'Coton brossé · finition broderie Polo', cut: 'Regular', made: 'China',
    image: 'uploads/shorts/sh1/c02.png',
    colors: [
      { id: 'c02', label: 'Black · Logo blanc',  hex: '#0a0a0a', image: 'uploads/shorts/sh1/c02.png' },
      { id: 'c03', label: 'Color 03',            hex: '#2c2c2c', image: 'uploads/shorts/sh1/c03.png' },
      { id: 'c04', label: 'Color 04',            hex: '#3a3a3a', image: 'uploads/shorts/sh1/c04.png' },
      { id: 'c05', label: 'Color 05',            hex: '#1a3a5e', image: 'uploads/shorts/sh1/c05.png' },
      { id: 'c06', label: 'Color 06',            hex: '#2a4a6e', image: 'uploads/shorts/sh1/c06.png' },
      { id: 'c07', label: 'Color 07',            hex: '#4a5a3a', image: 'uploads/shorts/sh1/c07.png' },
      { id: 'c08', label: 'Color 08',            hex: '#5a4a3a', image: 'uploads/shorts/sh1/c08.png' },
      { id: 'c09', label: 'Color 09',            hex: '#7a2a2a', image: 'uploads/shorts/sh1/c09.png' },
      { id: 'c10', label: 'Color 10',            hex: '#8a3a3a', image: 'uploads/shorts/sh1/c10.png' },
      { id: 'c11', label: 'Color 11',            hex: '#9a5a3a', image: 'uploads/shorts/sh1/c11.png' },
      { id: 'c12', label: 'Color 12',            hex: '#aa6a4a', image: 'uploads/shorts/sh1/c12.png' },
      { id: 'c13', label: 'Color 13',            hex: '#cac0a8', image: 'uploads/shorts/sh1/c13.png' },
      { id: 'c14', label: 'Color 14',            hex: '#d8d0bc', image: 'uploads/shorts/sh1/c14.png' },
      { id: 'c15', label: 'Color 15',            hex: '#a8a8a8', image: 'uploads/shorts/sh1/c15.png' },
      { id: 'c16', label: 'Color 16',            hex: '#8a8a8a', image: 'uploads/shorts/sh1/c16.png' },
      { id: 'c17', label: 'Color 17',            hex: '#6a8a6a', image: 'uploads/shorts/sh1/c17.png' },
      { id: 'c18', label: 'Color 18',            hex: '#3a5a3a', image: 'uploads/shorts/sh1/c18.png' },
      { id: 'c19', label: 'Color 19',            hex: '#1a3a1a', image: 'uploads/shorts/sh1/c19.png' },
      { id: 'c20', label: 'Color 20',            hex: '#5a3a5a', image: 'uploads/shorts/sh1/c20.png' },
      { id: 'c21', label: 'Color 21',            hex: '#7a4a7a', image: 'uploads/shorts/sh1/c21.png' },
      { id: 'c22', label: 'Color 22',            hex: '#3a2a1a', image: 'uploads/shorts/sh1/c22.png' },
    ],
  },
  {
    id: 'sh02', name: 'Lacoste Sport Shorts', category: 'shorts', subcategory: 'sport', rank: 61, price: 85,
    sizes: ['S','M','L','XL','XXL'], stock: { S: 4, M: 10, L: 12, XL: 8, XXL: 4 },
    palette: ['#0a3978','#062250','#2cb86a'], glyph: 'LAC', drop: 'SS26',
    materials: 'Microfibre quick-dry · finition crocodile brodé', cut: 'Regular', made: 'China',
    image: 'uploads/shorts/sh2/c01.jpg',
    colors: [
      { id: 'c02', label: 'Color 02',  hex: '#1a1a1a', image: 'uploads/shorts/sh2/c02.jpg' },
      { id: 'c03', label: 'Color 03',  hex: '#3a5a3a', image: 'uploads/shorts/sh2/c03.jpg' },
      { id: 'c04', label: 'Navy Blue', hex: '#0a3978', image: 'uploads/shorts/sh2/c04.jpg' },
      { id: 'c05', label: 'Color 05',  hex: '#aa3a2a', image: 'uploads/shorts/sh2/c05.jpg' },
      { id: 'c06', label: 'Color 06',  hex: '#c4d4d8', image: 'uploads/shorts/sh2/c06.jpg' },
      { id: 'c07', label: 'Color 07',  hex: '#6a7a5a', image: 'uploads/shorts/sh2/c07.jpg' },
      { id: 'c08', label: 'Color 08',  hex: '#5a4a3a', image: 'uploads/shorts/sh2/c08.jpg' },
      { id: 'c09', label: 'Color 09',  hex: '#3a3a3a', image: 'uploads/shorts/sh2/c09.jpg' },
      { id: 'c10', label: 'Color 10',  hex: '#7a5a4a', image: 'uploads/shorts/sh2/c10.jpg' },
      { id: 'c11', label: 'Color 11',  hex: '#5a8a8a', image: 'uploads/shorts/sh2/c11.jpg' },
      { id: 'c12', label: 'Color 12',  hex: '#9a4a3a', image: 'uploads/shorts/sh2/c12.jpg' },
      { id: 'c13', label: 'Color 13',  hex: '#3a3a5a', image: 'uploads/shorts/sh2/c13.jpg' },
      { id: 'c14', label: 'Color 14',  hex: '#7a3a3a', image: 'uploads/shorts/sh2/c14.jpg' },
      { id: 'c15', label: 'Color 15',  hex: '#4a4a4a', image: 'uploads/shorts/sh2/c15.jpg' },
      { id: 'c16', label: 'Color 16',  hex: '#8a8a6a', image: 'uploads/shorts/sh2/c16.jpg' },
      { id: 'c17', label: 'Color 17',  hex: '#2a5a4a', image: 'uploads/shorts/sh2/c17.jpg' },
      { id: 'c18', label: 'Color 18',  hex: '#5a3a3a', image: 'uploads/shorts/sh2/c18.jpg' },
      { id: 'c19', label: 'Color 19',  hex: '#a8a8c8', image: 'uploads/shorts/sh2/c19.jpg' },
      { id: 'c20', label: 'Color 20',  hex: '#cccccc', image: 'uploads/shorts/sh2/c20.jpg' },
      { id: 'c21', label: 'Color 21',  hex: '#3a6a5a', image: 'uploads/shorts/sh2/c21.jpg' },
      { id: 'c22', label: 'Color 22',  hex: '#5a3a2a', image: 'uploads/shorts/sh2/c22.jpg' },
    ],
  },

  // ============ SOUS-VÊTEMENTS (catégorie underwear) ============
  {
    id: 'uw01', name: 'Boxer Classic 021', category: 'underwear', subcategory: 'boxers', rank: 70, price: 12,
    sizes: ['S','M','L','XL'], stock: { S: 18, M: 32, L: 28, XL: 14 },
    palette: ['#0a0a0a','#1a1a1a','#5a5a5a'], glyph: 'BXR', drop: 'SS26',
    materials: 'Coton modal · ceinture élastique brodée', cut: 'Standard', made: 'China',
    image: 'uploads/underwear/uw1/c02.jpg',
    colors: [
      { id: 'c02', label: 'Blanc',       hex: '#f0f0f0', image: 'uploads/underwear/uw1/c02.jpg' },
      { id: 'c03', label: 'Gris',        hex: '#5a5a5a', image: 'uploads/underwear/uw1/c03.jpg' },
      { id: 'c04', label: 'Anthracite',  hex: '#3a3a3a', image: 'uploads/underwear/uw1/c04.jpg' },
      { id: 'c05', label: 'Bleu marine', hex: '#1a3a5e', image: 'uploads/underwear/uw1/c05.jpg' },
      { id: 'c06', label: 'Noir mat',    hex: '#0a0a0a', image: 'uploads/underwear/uw1/c06.jpg' },
      { id: 'c07', label: 'Couleur 07',  hex: '#aaaaaa', image: 'uploads/underwear/uw1/c07.jpg' },
      { id: 'c08', label: 'Blanc',       hex: '#f0f0f0', image: 'uploads/underwear/uw1/c08.jpg' },
      { id: 'c09', label: 'Couleur 09',  hex: '#666666', image: 'uploads/underwear/uw1/c09.jpg' },
      { id: 'c10', label: 'Couleur 10',  hex: '#444444', image: 'uploads/underwear/uw1/c10.jpg' },
      { id: 'c11', label: 'Couleur 11',  hex: '#222222', image: 'uploads/underwear/uw1/c11.jpg' },
    ],
  },
  {
    id: 'uw02', name: 'Boxer Premium N04',  category: 'underwear', subcategory: 'boxers', rank: 71, price: 12,
    sizes: ['L','XL','XXL'], stock: { L: 22, XL: 18, XXL: 10 },
    palette: ['#1a3a5e','#0a1f3d','#cc0033'], glyph: 'BXP', drop: 'SS26',
    materials: 'Coton 95% · élasthanne 5%, ceinture élastique large', cut: 'Standard', made: 'China',
    image: 'uploads/underwear/uw2/c04.jpg',
    colors: [
      { id: 'c04', label: 'Bleu marine',    hex: '#1a3a5e', image: 'uploads/underwear/uw2/c04.jpg' },
      { id: 'c05', label: 'Anthracite',     hex: '#3a3a3a', image: 'uploads/underwear/uw2/c05.jpg' },
      { id: 'c06', label: 'Bordeaux',       hex: '#7c1a1a', image: 'uploads/underwear/uw2/c06.jpg' },
      { id: 'c07', label: 'Orange',         hex: '#ff6b00', image: 'uploads/underwear/uw2/c07.jpg' },
      { id: 'c08', label: 'Gris clair',     hex: '#aaaaaa', image: 'uploads/underwear/uw2/c08.jpg' },
      { id: 'c09', label: 'Gris foncé',     hex: '#666666', image: 'uploads/underwear/uw2/c09.jpg' },
      { id: 'c10', label: 'Blanc',          hex: '#cccccc', image: 'uploads/underwear/uw2/c10.jpg' },
      { id: 'c11', label: 'Marron',         hex: '#4a3a2a', image: 'uploads/underwear/uw2/c11.jpg' },
      { id: 'c12', label: 'Caramel',        hex: '#8a5a3a', image: 'uploads/underwear/uw2/c12.jpg' },
      { id: 'c13', label: 'Vert kaki',      hex: '#3a5a3a', image: 'uploads/underwear/uw2/c13.jpg' },
      { id: 'c14', label: 'Aubergine',      hex: '#5a3a5a', image: 'uploads/underwear/uw2/c14.jpg' },
      { id: 'c15', label: 'Bleu nuit',      hex: '#2a4a6a', image: 'uploads/underwear/uw2/c15.jpg' },
    ],
  },

  // ============ CLAQUETTES (sous-cat de sneakers) ============
  {
    id: 'sl01', name: 'Yeezy Slide', category: 'sneakers', subcategory: 'claquettes', rank: 72, price: 51,
    sizes: ['36','37','38','39','40','41','42','43','44','45','46','47'],
    stock: { '36': 3, '37': 5, '38': 7, '39': 9, '40': 12, '41': 10, '42': 12, '43': 10, '44': 7, '45': 5, '46': 3, '47': 2 },
    palette: ['#1a1a1a','#3a2a1a','#dcd0b8'], glyph: 'SLD', drop: 'SS26',
    materials: 'EVA injecté · semelle anatomique · finition tactile', cut: 'Slide', made: 'China',
    image: 'uploads/shoes/claquettes/c01.jpg',
    colors: [
      { id: 'c01', label: 'Onyx',          hex: '#1a1a1a', image: 'uploads/shoes/claquettes/c01.jpg' },
      { id: 'c02', label: 'Dark Onyx',     hex: '#0a0a0a', image: 'uploads/shoes/claquettes/c02.jpg' },
      { id: 'c03', label: 'Bone 2022',     hex: '#d8cdb5', image: 'uploads/shoes/claquettes/c03.jpg' },
      { id: 'c04', label: 'Bone',          hex: '#dcd0b8', image: 'uploads/shoes/claquettes/c04.jpg' },
      { id: 'c05', label: 'Pure',          hex: '#bcae90', image: 'uploads/shoes/claquettes/c05.jpg' },
      { id: 'c06', label: 'Salt',          hex: '#e8e0d0', image: 'uploads/shoes/claquettes/c06.jpg' },
      { id: 'c07', label: 'Flax',          hex: '#a89060', image: 'uploads/shoes/claquettes/c07.jpg' },
      { id: 'c08', label: 'Ochre',         hex: '#a87038', image: 'uploads/shoes/claquettes/c08.jpg' },
      { id: 'c09', label: 'Granite',       hex: '#6a6a68', image: 'uploads/shoes/claquettes/c09.jpg' },
      { id: 'c10', label: 'Slate Grey',    hex: '#787878', image: 'uploads/shoes/claquettes/c10.jpg' },
      { id: 'c11', label: 'Slate Marine',  hex: '#2a3a52', image: 'uploads/shoes/claquettes/c11.jpg' },
      { id: 'c12', label: 'Azure',         hex: '#4a8acc', image: 'uploads/shoes/claquettes/c12.jpg' },
      { id: 'c13', label: 'Glow Green',    hex: '#9ad860', image: 'uploads/shoes/claquettes/c13.jpg' },
      { id: 'c14', label: 'Enflame Orange',hex: '#d8542a', image: 'uploads/shoes/claquettes/c14.jpg' },
    ],
  },

  // ============ Pull Stone Island Compass — sweat col rond ============
  {
    id: 'h05', name: 'Pull Stone Island Compass', category: 'hoodies', subcategory: 'crewnecks', rank: 77, price: 80,
    sizes: ['S','M','L','XL','XXL'], stock: { S: 4, M: 10, L: 12, XL: 8, XXL: 3 },
    palette: ['#0a4d2a','#1a1a1a','#6a4030'], glyph: 'SI', drop: 'SS26',
    materials: 'Coton brossé · patch Compass à la manche',
    cut: 'Regular', made: 'Italy',
    image: 'uploads/stone-island/vert.jpg',
    colors: [
      { id: 'vert',   label: 'Vert',    hex: '#1a8a3a', image: 'uploads/stone-island/vert.jpg' },
      { id: 'noir',   label: 'Noir',    hex: '#1a1a1a', image: 'uploads/stone-island/noir.jpg' },
      { id: 'marron', label: 'Marron',  hex: '#6a4030', image: 'uploads/stone-island/marron.jpg' },
    ],
  },

  // ============ Pull Ami De Coeur — sweat col rond ============
  {
    id: 'h04', name: 'Pull Ami De Coeur', category: 'hoodies', subcategory: 'crewnecks', rank: 78, price: 75,
    sizes: ['XS','S','M','L','XL','XXL'], stock: { XS: 3, S: 8, M: 14, L: 12, XL: 8, XXL: 4 },
    palette: ['#0a0a0a','#1a1a1a','#cc0033'], glyph: 'AMI', drop: 'SS26',
    materials: 'Coton bio brossé · broderie cœur Ami',
    cut: 'Regular', made: 'Portugal',
    image: 'uploads/ami-sweat/c01.jpg',
    colors: [
      { id: 'c01', label: 'Noir',          hex: '#0a0a0a', image: 'uploads/ami-sweat/c01.jpg' },
      { id: 'c02', label: 'Blanc',         hex: '#f5f5f0', image: 'uploads/ami-sweat/c02.jpg' },
      { id: 'c03', label: 'Gris chiné',    hex: '#9a9a9a', image: 'uploads/ami-sweat/c03.jpg' },
      { id: 'c04', label: 'Beige',         hex: '#c8b896', image: 'uploads/ami-sweat/c04.jpg' },
      { id: 'c05', label: 'Aqua',          hex: '#7ec8c8', image: 'uploads/ami-sweat/c05.jpg' },
    ],
  },

  // ============ Boston Clog (sous-cat claquettes) — 14 colorways ============
  {
    id: 'sl02', name: 'Birkenstock Boston', category: 'sneakers', subcategory: 'claquettes', rank: 80, price: 75,
    sizes: ['36','37','38','39','40','41','42','43','44','45','46'],
    stock: { '36': 2, '37': 4, '38': 6, '39': 8, '40': 10, '41': 9, '42': 10, '43': 8, '44': 6, '45': 3, '46': 2 },
    palette: ['#1a1a1a','#2a2a2a','#c0a060'], glyph: 'BST', drop: 'SS26',
    materials: 'Cuir suède · semelle liège · sangle réglable bouclée',
    cut: 'Slip-on closed-toe', made: 'China',
    image: 'uploads/shoes/birkenstock-style/c01.png',
    colors: [
      { id: 'c01', label: 'Noir suède',        hex: '#1a1a1a', image: 'uploads/shoes/birkenstock-style/c01.png' },
      { id: 'c02', label: 'Noir cuir',         hex: '#0a0a0a', image: 'uploads/shoes/birkenstock-style/c02.png' },
      { id: 'c03', label: 'Mocha',             hex: '#5a3a28', image: 'uploads/shoes/birkenstock-style/c03.png' },
      { id: 'c04', label: 'Taupe',             hex: '#a89788', image: 'uploads/shoes/birkenstock-style/c04.png' },
      { id: 'c05', label: 'Latte Cream',       hex: '#c8b89c', image: 'uploads/shoes/birkenstock-style/c05.png' },
      { id: 'c06', label: 'Faded Khaki',       hex: '#9a9070', image: 'uploads/shoes/birkenstock-style/c06.png' },
      { id: 'c07', label: 'Tobacco Brown',     hex: '#6a4028', image: 'uploads/shoes/birkenstock-style/c07.png' },
      { id: 'c08', label: 'Habana',            hex: '#4a2c1a', image: 'uploads/shoes/birkenstock-style/c08.png' },
      { id: 'c09', label: 'Tobacco',           hex: '#7a4a30', image: 'uploads/shoes/birkenstock-style/c09.png' },
      { id: 'c10', label: 'Concrete Gray',     hex: '#787878', image: 'uploads/shoes/birkenstock-style/c10.png' },
      { id: 'c11', label: 'Iron',              hex: '#5a5a5a', image: 'uploads/shoes/birkenstock-style/c11.png' },
      { id: 'c12', label: 'Stone Coin',        hex: '#b8a890', image: 'uploads/shoes/birkenstock-style/c12.png' },
      { id: 'c13', label: 'Shearling Mocha',   hex: '#6a4030', image: 'uploads/shoes/birkenstock-style/c13.png' },
      { id: 'c14', label: 'Antique White',     hex: '#e8dccc', image: 'uploads/shoes/birkenstock-style/c14.png' },
    ],
  },

  // ============ Runner K-14 (sous-cat runners) ============
  {
    id: 's03', name: 'ASICS Gel-Kayano 14', category: 'sneakers', subcategory: 'runners', rank: 73, price: 130,
    sizes: ['36','37','38','39','40','41','42','43','44','45','46'],
    stock: { '36': 2, '37': 4, '38': 5, '39': 6, '40': 6, '41': 5, '42': 4, '43': 3, '44': 2, '45': 1, '46': 1 },
    palette: ['#f4f1ea','#bdb3a0','#cc0033'], glyph: 'K14', drop: 'SS26',
    materials: 'Mesh respirant · semelle Gel-tech · structure Trusstic', cut: 'Low-top', made: 'China',
    image: 'uploads/shoes/asics-k14/c02.jpg',
    colors: [
      { id: 'c02', label: 'Argent',    hex: '#cccccc', image: 'uploads/shoes/asics-k14/c02.jpg' },
      { id: 'c03', label: 'Orange',    hex: '#cc6633', image: 'uploads/shoes/asics-k14/c03.jpg' },
      { id: 'c04', label: 'Bleu',      hex: '#3366cc', image: 'uploads/shoes/asics-k14/c04.jpg' },
      { id: 'c05', label: 'Vert',      hex: '#66cc66', image: 'uploads/shoes/asics-k14/c05.jpg' },
      { id: 'c06', label: 'Rose',      hex: '#cc3366', image: 'uploads/shoes/asics-k14/c06.jpg' },
      { id: 'c07', label: 'Blanc',     hex: '#cccccc', image: 'uploads/shoes/asics-k14/c07.jpg' },
      { id: 'c08', label: 'Gris',      hex: '#666666', image: 'uploads/shoes/asics-k14/c08.jpg' },
      { id: 'c09', label: 'Camel',     hex: '#996633', image: 'uploads/shoes/asics-k14/c09.jpg' },
      { id: 'c10', label: 'Navy',      hex: '#333366', image: 'uploads/shoes/asics-k14/c10.jpg' },
      { id: 'c11', label: 'Olive',     hex: '#669966', image: 'uploads/shoes/asics-k14/c11.jpg' },
      { id: 'c12', label: 'Or',        hex: '#cc9933', image: 'uploads/shoes/asics-k14/c12.jpg' },
      { id: 'c13', label: 'Bordeaux',  hex: '#993333', image: 'uploads/shoes/asics-k14/c13.jpg' },
      { id: 'c14', label: 'Noir',      hex: '#333333', image: 'uploads/shoes/asics-k14/c14.jpg' },
    ],
  },

  // ============ AMI HEART T-SHIRT — 11 couleurs ============
  {
    id: 't04', name: 'Ami Heart Tee', category: 'tees', subcategory: 'short-sleeve', rank: 76, price: 25,
    sizes: ['S','M','L','XL'], stock: { S: 8, M: 14, L: 12, XL: 6 },
    palette: ['#f4f1ea','#cccccc','#c8102e'], glyph: 'AMI', drop: 'SS26',
    materials: 'Coton brodé · logo Ami Heart cousu', cut: 'Regular', made: 'Portugal',
    image: 'uploads/ami-tee/main.jpg',
    colors: [
      { id: 'wht', label: 'Blanc · Logo Noir',   hex: '#f4f1ea' },
      { id: 'gry', label: 'Gris chiné',          hex: '#9a9a9a' },
      { id: 'crm', label: 'Crème',               hex: '#efe7c8' },
      { id: 'lim', label: 'Lime',                hex: '#c8dc4e' },
      { id: 'wr',  label: 'Blanc · Logo Rouge',  hex: '#ffffff' },
      { id: 'br',  label: 'Noir · Logo Rouge',   hex: '#0a0a0a' },
      { id: 'pnk', label: 'Rose poudre',         hex: '#f0bcc2' },
      { id: 'sky', label: 'Bleu ciel',           hex: '#a8c4d0' },
      { id: 'red', label: 'Rouge',               hex: '#c8102e' },
      { id: 'grn', label: 'Vert sapin',          hex: '#1f4d3a' },
      { id: 'bw',  label: 'Noir · Logo Blanc',   hex: '#0a0a0a' },
    ],
  },

  // ============================================================
  // BATCH 28 — Produits curés depuis Drive sheet (sélections vertes)
  // Sources photos : GOAT (HD) pour ~12 produits, placeholders SVG pour autres
  // ============================================================

  // T-shirts (3)
  { id: 't05', name: 'Vlone Tee', category: 'tees', subcategory: 'short-sleeve', rank: 100, price: 38, sizes: ['S','M','L','XL'], stock: { S: 4, M: 8, L: 8, XL: 4 }, palette: ['#0a0a0a','#1a1a1a','#cc0033'], glyph: 'VLN', drop: 'SS26', materials: 'Coton lourd · imprimé orange Vlone V', cut: 'Regular', made: 'China', image: 'uploads/batch28/vlone/c01.jpg',
    colors: [
      { id: 'staple',  label: 'Staple Blue', hex: '#7a8da6', image: 'uploads/batch28/vlone/c01.jpg' },
      { id: 'kec',     label: 'Keep Enemies Close', hex: '#f4f1ea', image: 'uploads/batch28/vlone/c02.jpg' },
      { id: 'kodakW',  label: 'Kodak White', hex: '#f4f1ea', image: 'uploads/batch28/vlone/c03.jpg' },
      { id: 'kodakK',  label: 'Kodak Black', hex: '#1a1a1a', image: 'uploads/batch28/vlone/c04.jpg' },
      { id: 'juice',   label: 'Juice WRLD Legend', hex: '#f4f1ea', image: 'uploads/batch28/vlone/c05.jpg' },
    ],
  },
  { id: 't06', name: 'Pack T-shirts streetwear assortis', category: 'tees', subcategory: 'short-sleeve', rank: 101, price: 24, sizes: ['S','M','L','XL','XXL'], stock: { S: 5, M: 10, L: 8, XL: 5, XXL: 2 }, palette: ['#1a1a1a','#2a2a2a','#f4f1ea'], glyph: 'BRD', drop: 'SS26', materials: 'Coton 100% · lot multi-marques surplus usine', cut: 'Standard', made: 'China', image: 'uploads/batch28/pack-tees/c01.jpg' },
  { id: 't07', name: 'Nike Sportswear Club Tee', category: 'tees', subcategory: 'short-sleeve', rank: 102, price: 30, sizes: ['S','M','L','XL','XXL'], stock: { S: 6, M: 12, L: 10, XL: 6, XXL: 3 }, palette: ['#0a0a0a','#1a1a1a','#cc0033'], glyph: 'NSW', drop: 'SS26', materials: 'Coton · logo swoosh brodé poitrine', cut: 'Standard', made: 'Vietnam', image: 'uploads/batch28/nike-tee/c01.jpg' },

  // Maillot foot (1)
  { id: 'j57', name: 'Maillot Concept 667', category: 'tees', subcategory: 'maillots-foot', rank: 103, price: 25, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 4, XL: 3, XXL: 1 }, palette: ['#1a1a1a','#2a2a2a','#cc0033'], glyph: '667', drop: 'SS26', materials: 'Polyester recyclé · numérotation libre 667', cut: 'Standard', made: 'Thailand', image: 'uploads/batch28/maillot667/c01.jpg' },

  // Sweats & Hoodies (5)
  { id: 'h06', name: 'Yeezy Gap Hoodie', category: 'hoodies', subcategory: 'hoodies', rank: 104, price: 75, sizes: ['S','M','L','XL'], stock: { S: 3, M: 8, L: 8, XL: 4 }, palette: ['#1a1a1a','#2a2a2a','#7a4a30'], glyph: 'YZY', drop: 'SS26', materials: 'Coton brossé bio · coupe oversized', cut: 'Oversized', made: 'Cambodia', image: 'uploads/batch28/yeezy-hoodie/c01.jpg',
    colors: [
      { id: 'blk', label: 'Noir',  hex: '#1a1a1a', image: 'uploads/batch28/yeezy-hoodie/c01.jpg' },
      { id: 'red', label: 'Rouge', hex: '#a83030', image: 'uploads/batch28/yeezy-hoodie/c02.jpg' },
      { id: 'blu', label: 'Bleu',  hex: '#2a5a8a', image: 'uploads/batch28/yeezy-hoodie/c03.jpg' },
      { id: 'brn', label: 'Brun',  hex: '#7a4a30', image: 'uploads/batch28/yeezy-hoodie/c04.jpg' },
    ],
  },
  { id: 'h07', name: 'Pull tricot LV Comics', category: 'hoodies', subcategory: 'crewnecks', rank: 105, price: 95, sizes: ['S','M','L','XL'], stock: { S: 2, M: 4, L: 4, XL: 2 }, palette: ['#f0e8dc','#a08070','#3a2a1a'], glyph: 'LV', drop: 'SS26', materials: 'Coton brossé · imprimé LV Comics all-over', cut: 'Regular', made: 'China', image: 'uploads/batch28/lv-knit/c01.jpg' },
  { id: 'h08', name: 'Nike NOCTA Tech Fleece Hoodie', category: 'hoodies', subcategory: 'hoodies', rank: 106, price: 95, sizes: ['S','M','L','XL'], stock: { S: 3, M: 6, L: 6, XL: 3 }, palette: ['#1a1a1a','#2a2a2a','#787878'], glyph: 'NCT', drop: 'SS26', materials: 'Tech Fleece Nike · collab Drake NOCTA', cut: 'Standard', made: 'Vietnam', image: 'uploads/batch28/nike-nocta/c01.jpg',
    colors: [
      { id: 'blk',  label: 'Noir',          hex: '#1a1a1a', image: 'uploads/batch28/nike-nocta/c01.jpg' },
      { id: 'gry',  label: 'Gris',          hex: '#787878', image: 'uploads/batch28/nike-nocta/c02.jpg' },
      { id: 'grn',  label: 'Vert Neptune',  hex: '#3a7a6a', image: 'uploads/batch28/nike-nocta/c03.jpg' },
    ],
  },
  { id: 'h09', name: 'CP Company Light Fleece Zip Hoodie', category: 'hoodies', subcategory: 'crewnecks', rank: 107, price: 85, sizes: ['S','M','L','XL','XXL'], stock: { S: 2, M: 5, L: 5, XL: 3, XXL: 2 }, palette: ['#1a1a1a','#2c2c2c','#1f4d3a'], glyph: 'CPC', drop: 'SS26', materials: 'Coton léger fleece · capuche + goggle lens', cut: 'Regular', made: 'Italy', image: 'uploads/batch28/cp-zip/c01.jpg',
    colors: [
      { id: 'blk', label: 'Noir',          hex: '#1a1a1a', image: 'uploads/batch28/cp-zip/c01.jpg' },
      { id: 'cap', label: 'Capers',        hex: '#3a4a30', image: 'uploads/batch28/cp-zip/c02.jpg' },
      { id: 'slv', label: 'Silver Blue',   hex: '#8a9aa6', image: 'uploads/batch28/cp-zip/c03.jpg' },
      { id: 'ivy', label: 'Ivy Green',     hex: '#3a5a3a', image: 'uploads/batch28/cp-zip/c04.jpg' },
    ],
  },
  { id: 'h10', name: 'Ralph Lauren Full Zip Hoodie', category: 'hoodies', subcategory: 'crewnecks', rank: 108, price: 65, sizes: ['S','M','L','XL'], stock: { S: 3, M: 7, L: 6, XL: 3 }, palette: ['#1a1a1a','#0a3a78','#cc0033'], glyph: 'RL', drop: 'SS26', materials: 'Coton mélangé · broderie Polo poney', cut: 'Standard', made: 'China', image: 'uploads/batch28/ralph-zip/c01.jpg' },

  // Outerwear (3)
  { id: 'o04', name: 'K-Way Le Vrai Coupe-vent', category: 'outerwear', subcategory: 'coats', rank: 109, price: 65, sizes: ['S','M','L','XL'], stock: { S: 4, M: 8, L: 8, XL: 4 }, palette: ['#cc0033','#1a1a1a','#f4f1ea'], glyph: 'KWY', drop: 'SS26', materials: 'Nylon imperméable · pliable banane ceinture', cut: 'Standard', made: 'Italy', image: 'uploads/batch28/kway/c01.jpg' },
  { id: 'o05', name: 'Doudoune Palm Angels × Moncler Maya', category: 'outerwear', subcategory: 'coats', rank: 110, price: 220, sizes: ['S','M','L','XL'], stock: { S: 1, M: 3, L: 3, XL: 2 }, palette: ['#1a1a1a','#5a8aca','#f4f1ea'], glyph: 'PAM', drop: 'SS26', materials: 'Nylon brillant Maya · plumes naturelles', cut: 'Regular', made: 'Italy', image: 'uploads/batch28/palm-moncler/c01.jpg',
    colors: [
      { id: 'lb', label: 'Bleu clair / Blanc', hex: '#5a8aca', image: 'uploads/batch28/palm-moncler/c01.jpg' },
      { id: 'bw', label: 'Noir / Blanc',       hex: '#1a1a1a', image: 'uploads/batch28/palm-moncler/c02.jpg' },
      { id: 'blk',label: 'Noir',                hex: '#0a0a0a', image: 'uploads/batch28/palm-moncler/c03.jpg' },
    ],
  },
  { id: 'o06', name: 'Doudoune Ralph Lauren Polo', category: 'outerwear', subcategory: 'coats', rank: 111, price: 130, sizes: ['S','M','L','XL'], stock: { S: 2, M: 5, L: 5, XL: 2 }, palette: ['#7a5030','#3a2a1a','#cc0033'], glyph: 'RLP', drop: 'SS26', materials: 'Nylon léger · doudoune Ralph budget', cut: 'Regular', made: 'China', image: 'uploads/batch28/ralph-puffer/c01.jpg' },

  // Pants (2)
  { id: 'p04', name: 'Jeans Corteiz Noir', category: 'pants', subcategory: 'trousers', rank: 112, price: 65, sizes: ['28','30','32','34','36'], stock: { '28': 2, '30': 5, '32': 6, '34': 4, '36': 2 }, palette: ['#1a1a1a','#2a2a2a','#cc0033'], glyph: 'CTZ', drop: 'SS26', materials: 'Denim brut · logo Alcatraz brodé', cut: 'Relaxed', made: 'UK', image: 'uploads/batch28/corteiz/c01.jpg?v=2' },
  { id: 'p05', name: 'Jogging Balenciaga 1:1', category: 'pants', subcategory: 'sweatpants', rank: 113, price: 95, sizes: ['S','M','L','XL'], stock: { S: 2, M: 5, L: 5, XL: 2 }, palette: ['#1a1a1a','#787878','#f4f1ea'], glyph: 'BAL', drop: 'SS26', materials: 'Coton molletonné · coupe baggy Balenciaga', cut: 'Baggy', made: 'Italy', image: 'uploads/batch28/balenciaga-jog/c01.jpg',
    colors: [
      { id: 'blk', label: 'Noir',     hex: '#1a1a1a', image: 'uploads/batch28/balenciaga-jog/c01.jpg' },
      { id: 'ylw', label: 'Jaune',    hex: '#d8b020', image: 'uploads/batch28/balenciaga-jog/c02.jpg' },
      { id: 'ow',  label: 'Off-White', hex: '#e8e0d0', image: 'uploads/batch28/balenciaga-jog/c03.jpg' },
    ],
  },

  // Shorts (6)
  { id: 'sh03', name: 'Short de bain Prada Re-Nylon', category: 'shorts', subcategory: 'sport', rank: 114, price: 60, sizes: ['S','M','L','XL'], stock: { S: 3, M: 6, L: 5, XL: 2 }, palette: ['#0a0a0a','#1a1a1a','#f4f1ea'], glyph: 'PRA', drop: 'SS26', materials: 'Nylon Re-Nylon · triangle Prada brodé', cut: 'Standard', made: 'Italy', image: 'uploads/batch28/prada-swim/c01.jpg' },
  { id: 'sh04', name: 'Short de bain Burberry Vintage Check', category: 'shorts', subcategory: 'sport', rank: 115, price: 60, sizes: ['S','M','L','XL'], stock: { S: 3, M: 6, L: 5, XL: 2 }, palette: ['#a07050','#f4e0c0','#1a1a1a'], glyph: 'BUR', drop: 'SS26', materials: 'Nylon · motif Vintage Check Burberry', cut: 'Standard', made: 'Italy', image: 'uploads/batch28/burberry-swim/c01.jpg' },
  { id: 'sh05', name: 'Short de foot vintage', category: 'shorts', subcategory: 'sport', rank: 116, price: 25, sizes: ['S','M','L','XL'], stock: { S: 4, M: 8, L: 7, XL: 3 }, palette: ['#0a3a78','#cc0033','#f4f1ea'], glyph: 'FUT', drop: 'SS26', materials: 'Polyester recyclé · réplique pro', cut: 'Standard', made: 'Thailand', image: 'uploads/batch28/short-foot/c01.jpg' },
  { id: 'sh06', name: 'Short en jean coupe brute', category: 'shorts', subcategory: 'casual', rank: 117, price: 45, sizes: ['28','30','32','34','36'], stock: { '28': 2, '30': 4, '32': 5, '34': 3, '36': 1 }, palette: ['#2a4a78','#6a8aba','#1a1a1a'], glyph: 'JNS', drop: 'SS26', materials: 'Denim · ourlet déchiré', cut: 'Relaxed', made: 'China', image: 'uploads/batch28/short-jean/c01.jpg' },
  { id: 'sh07', name: 'Short Moncler', category: 'shorts', subcategory: 'casual', rank: 118, price: 75, sizes: ['S','M','L','XL'], stock: { S: 2, M: 5, L: 4, XL: 2 }, palette: ['#1a1a1a','#2a2a2a','#cc0033'], glyph: 'MNC', drop: 'SS26', materials: 'Nylon technique · patch tricolore Moncler', cut: 'Standard', made: 'Italy', image: 'uploads/batch28/moncler-short/c01.jpg' },
  { id: 'sh08', name: 'Short Stone Island Dirty Khaki', category: 'shorts', subcategory: 'casual', rank: 119, price: 75, sizes: ['S','M','L','XL'], stock: { S: 3, M: 6, L: 5, XL: 2 }, palette: ['#5a5a3a','#3a3a2a','#1a1a1a'], glyph: 'SI', drop: 'SS26', materials: 'Coton armé · patch boussole', cut: 'Standard', made: 'Italy', image: 'uploads/batch28/stone-short/c01.jpg',
    colors: [
      { id: 'sage',  label: 'Sage',      hex: '#7a8a6a', image: 'uploads/batch28/stone-short/c01.jpg' },
      { id: 'pist',  label: 'Pistache',  hex: '#a8c890', image: 'uploads/batch28/stone-short/c02.jpg' },
      { id: 'beige', label: 'Beige',     hex: '#c8b896', image: 'uploads/batch28/stone-short/c03.jpg' },
    ],
  },

  // Chaussures (4)
  { id: 's04', name: 'Nike Air Force 1 Low', category: 'sneakers', subcategory: 'court', rank: 120, price: 95, sizes: ['39','40','41','42','43','44','45','46'], stock: { '39': 1, '40': 4, '41': 6, '42': 8, '43': 7, '44': 5, '45': 3, '46': 2 }, palette: ['#f4f1ea','#1a1a1a','#cc0033'], glyph: 'AF1', drop: 'SS26', materials: 'Cuir lisse · semelle Air encapsulée', cut: 'Low-top', made: 'Vietnam', image: 'uploads/batch28/af1/c01.jpg?v=2',
    colors: [
      { id: 'wht', label: 'Triple White',         hex: '#f4f1ea', image: 'uploads/batch28/af1/c01.jpg?v=2' },
      { id: 'nav', label: 'Mystic Navy',          hex: '#1a2a4a', image: 'uploads/batch28/af1/c02.jpg' },
      { id: 'red', label: 'Patent Dark Team Red', hex: '#a02030', image: 'uploads/batch28/af1/c03.jpg' },
      { id: 'gld', label: 'Patent Topaz Gold',    hex: '#c89a30', image: 'uploads/batch28/af1/c04.jpg' },
    ],
  },
  { id: 's05', name: 'New Balance 2002R', category: 'sneakers', subcategory: 'runners', rank: 121, price: 110, sizes: ['39','40','41','42','43','44','45','46'], stock: { '39': 1, '40': 3, '41': 5, '42': 7, '43': 6, '44': 4, '45': 2, '46': 1 }, palette: ['#787878','#a8a8a8','#1a1a1a'], glyph: '2002', drop: 'SS26', materials: 'Mesh · suède · semelle ABZORB N-ergy', cut: 'Low-top', made: 'Vietnam', image: 'uploads/batch28/nb2002r/c01.jpg',
    colors: [
      { id: 'rain',  label: 'Rain Cloud', hex: '#a0a8b0', image: 'uploads/batch28/nb2002r/c01.jpg' },
      { id: 'phnt',  label: 'Phantom',    hex: '#787878', image: 'uploads/batch28/nb2002r/c02.jpg' },
      { id: 'blk',   label: 'Black',      hex: '#1a1a1a', image: 'uploads/batch28/nb2002r/c03.jpg' },
      { id: 'salt',  label: 'Sea Salt',   hex: '#e8dfd0', image: 'uploads/batch28/nb2002r/c04.jpg' },
    ],
  },
  { id: 's06', name: 'Yeezy Foam RNR', category: 'sneakers', subcategory: 'claquettes', rank: 122, price: 85, sizes: ['39','40','41','42','43','44','45','46'], stock: { '39': 1, '40': 3, '41': 5, '42': 6, '43': 5, '44': 3, '45': 2, '46': 1 }, palette: ['#1a1a1a','#787878','#dcd0b8'], glyph: 'FOAM', drop: 'SS26', materials: 'Mousse EVA + algues · monoblock injecté', cut: 'Foam Runner', made: 'China', image: 'uploads/batch28/yeezy-foam/c01.jpg',
    colors: [
      { id: 'onx',  label: 'Onyx',       hex: '#1a1a1a', image: 'uploads/batch28/yeezy-foam/c01.jpg' },
      { id: 'salt', label: 'Stone Salt', hex: '#dcd0b8', image: 'uploads/batch28/yeezy-foam/c02.jpg' },
      { id: 'sage', label: 'Stone Sage', hex: '#9aaa90', image: 'uploads/batch28/yeezy-foam/c03.jpg' },
      { id: 'och',  label: 'Ochre',      hex: '#a87038', image: 'uploads/batch28/yeezy-foam/c04.jpg' },
    ],
  },
  { id: 's07', name: 'Nike Air Max Plus TN', category: 'sneakers', subcategory: 'runners', rank: 123, price: 105, sizes: ['39','40','41','42','43','44','45','46'], stock: { '39': 1, '40': 4, '41': 6, '42': 7, '43': 6, '44': 4, '45': 2, '46': 1 }, palette: ['#1a1a1a','#787878','#cc0033'], glyph: 'TN', drop: 'SS26', materials: 'Mesh · semelle Tuned Air visible', cut: 'Low-top', made: 'Vietnam', image: 'uploads/batch28/nike-tn/c01.jpg',
    colors: [
      { id: 'blk',  label: 'Triple Black',     hex: '#1a1a1a', image: 'uploads/batch28/nike-tn/c01.jpg' },
      { id: 'ublk', label: 'Ultra Black',      hex: '#0a0a0a', image: 'uploads/batch28/nike-tn/c02.jpg' },
      { id: 'spir', label: 'GS Spirograph',    hex: '#5a8aca', image: 'uploads/batch28/nike-tn/c03.jpg' },
    ],
  },

  // Accessoires (4)
  { id: 'a04', name: 'Porte-monnaie Goyard Richelieu', category: 'access', subcategory: 'bags', rank: 124, price: 95, sizes: ['OS'], stock: { OS: 6 }, palette: ['#1a1a1a','#5a4a3a','#f4f1ea'], glyph: 'GYR', drop: 'SS26', materials: 'Toile Goyardine chevron · cuir intérieur', cut: 'Wallet', made: 'France', image: 'uploads/batch28/goyard-wallet/c01.jpg' },
  { id: 'c03', name: 'Casquette plate streetwear', category: 'caps', subcategory: 'caps', rank: 125, price: 35, sizes: ['OS'], stock: { OS: 10 }, palette: ['#1a1a1a','#2a2a2a','#cc0033'], glyph: 'CAP', drop: 'SS26', materials: 'Coton twill · visière plate ajustable', cut: 'Snapback', made: 'China', image: 'uploads/batch28/flat-cap/c01.jpg' },
  { id: 'c04', name: 'Casquette Gucci Logo Band', category: 'caps', subcategory: 'caps', rank: 126, price: 55, sizes: ['OS'], stock: { OS: 8 }, palette: ['#1a1a1a','#f4f1ea','#c89a30'], glyph: 'GUC', drop: 'SS26', materials: 'Coton · bandeau logo Gucci terrycloth', cut: 'Baseball', made: 'Italy', image: 'uploads/batch28/gucci-cap/c01.jpg' },
  { id: 'a05', name: 'Sacoche Goyard Citadin Messenger', category: 'access', subcategory: 'bags', rank: 127, price: 130, sizes: ['OS'], stock: { OS: 5 }, palette: ['#2a3a5e','#5a4a3a','#f4f1ea'], glyph: 'GYR', drop: 'SS26', materials: 'Toile Goyardine chevron · bandoulière ajustable', cut: 'Messenger', made: 'France', image: 'uploads/batch28/goyard-sac/c01.jpg' },
];

// Top-level nav categories (Nike-style) — each can include sub-categories shown in a mega-menu.
window.NAV_CATS = [
  {
    id: 'sneakers', label: 'Chaussures',
    subs: [
      { id: 'all',        label: 'Toutes les chaussures' },
      { id: 'runners',    label: 'Running' },
      { id: 'court',      label: 'Court' },
      { id: 'claquettes', label: 'Claquettes' },
    ],
    feature: 's03',
  },
  {
    id: 'hoodies', label: 'Sweats & Hoodies',
    subs: [
      { id: 'all',       label: 'Tous les sweats' },
      { id: 'hoodies',   label: 'Hoodies' },
      { id: 'crewnecks', label: 'Sweats col rond' },
    ],
    feature: 'h06',
  },
  {
    id: 'tees', label: 'T-shirts',
    subs: [
      { id: 'all',           label: 'Tous les t-shirts' },
      { id: 'short-sleeve',  label: 'Manches courtes' },
      { id: 'long-sleeve',   label: 'Manches longues' },
      { id: 'maillots-foot', label: 'Maillots de foot' },
    ],
    feature: 'j03',
  },
  {
    id: 'pants', label: 'Pantalons',
    subs: [
      { id: 'all',        label: 'Tous les pantalons' },
      { id: 'cargo',      label: 'Cargo' },
      { id: 'trousers',   label: 'Pantalons' },
      { id: 'sweatpants', label: 'Joggings' },
    ],
    feature: 'p05',
  },
  {
    id: 'shorts', label: 'Shorts',
    subs: [
      { id: 'all',    label: 'Tous les shorts' },
      { id: 'casual', label: 'Casual' },
      { id: 'sport',  label: 'Sport' },
    ],
    feature: 'sh01',
  },
  {
    id: 'underwear', label: 'Sous-vêtements',
    subs: [
      { id: 'all',    label: 'Tout' },
      { id: 'boxers', label: 'Boxers' },
    ],
    feature: 'uw01',
  },
  {
    id: 'outerwear', label: 'Vestes & Manteaux',
    subs: [
      { id: 'all',     label: 'Toute la collection' },
      { id: 'coats',   label: 'Manteaux & Macs' },
      { id: 'bombers', label: 'Bombers' },
    ],
    feature: 'o05',
  },
  {
    id: 'access', label: 'Accessoires',
    multiCat: true, // includes caps + access subcategories
    subs: [
      { id: 'all',     label: 'Tous les accessoires' },
      { id: 'caps',    label: 'Casquettes',     cat: 'caps',   sub: 'caps' },
      { id: 'bucket',  label: 'Bobs',           cat: 'caps',   sub: 'bucket' },
      { id: 'bags',    label: 'Sacs',           cat: 'access', sub: 'bags' },
      { id: 'belts',   label: 'Ceintures',      cat: 'access', sub: 'belts' },
      { id: 'jewelry', label: 'Bijoux',         cat: 'access', sub: 'jewelry' },
    ],
    feature: 'a05',
  },
];

window.CATEGORIES = [
  { id: 'all',       label: 'Tout' },
  { id: 'tees',      label: 'T-shirts' },
  { id: 'hoodies',   label: 'Sweats' },
  { id: 'outerwear', label: 'Vestes' },
  { id: 'pants',     label: 'Pantalons' },
  { id: 'shorts',    label: 'Shorts' },
  { id: 'underwear', label: 'Sous-vêtements' },
  { id: 'caps',      label: 'Casquettes' },
  { id: 'access',    label: 'Accessoires' },
  { id: 'sneakers',  label: 'Chaussures' },
];

window.CATEGORY_LABEL = window.CATEGORIES.reduce((m, c) => (m[c.id] = c.label.toUpperCase(), m), {});

// Helpers
window.totalStock = (p) => Object.values(p.stock).reduce((a, b) => a + b, 0);
window.isLowStock = (p) => window.totalStock(p) <= 6 && window.totalStock(p) > 0;
window.isSoldOut = (p) => window.totalStock(p) === 0;

// Best sellers — sorted by rank (lower = more popular)
window.bestSellers = (n = 8) => window.PRODUCTS.slice().sort((a, b) => a.rank - b.rank).slice(0, n);
