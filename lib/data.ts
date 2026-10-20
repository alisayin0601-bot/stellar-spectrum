import type { L } from './i18n'

const FLUENT = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets'
const fluent = (name: string) => `${FLUENT}/${encodeURIComponent(name)}/3D/${name.toLowerCase().replace(/ /g, '_')}_3d.png`

export const EMOJI = {
  sun: { src: fluent('Sun'), native: '☀️' },
  mercury: { src: fluent('New moon'), native: '🌑' },
  venus: { src: fluent('Volcano'), native: '🌋' },
  earth: { src: fluent('Globe showing asia-australia'), native: '🌏' },
  mars: { src: fluent('Red circle'), native: '🔴' },
  jupiter: { src: fluent('Orange circle'), native: '🟠' },
  saturn: { src: fluent('Ringed planet'), native: '🪐' },
  uranus: { src: fluent('Ice'), native: '🧊' },
  neptune: { src: fluent('Blue circle'), native: '🔵' },
  comet: { src: fluent('Comet'), native: '☄️' },
  asteroid: { src: fluent('Rock'), native: '🪨' },
  moon: { src: fluent('Crescent moon'), native: '🌙' },
  meteoroid: { src: fluent('Shooting star'), native: '🌠' },
  star: { src: fluent('Glowing star'), native: '🌟' },
  planetLife: { src: fluent('Globe showing americas'), native: '🌎' },
  galaxy: { src: fluent('Milky way'), native: '🌌' },
  quiz: { src: fluent('Red question mark'), native: '❓' },
  rocket: { src: fluent('Rocket'), native: '🚀' },
  memo: { src: fluent('Memo'), native: '📝' },
  telescope: { src: fluent('Telescope'), native: '🔭' },
  nebula: { src: fluent('Sparkles'), native: '✨' },
  camera: { src: fluent('Camera'), native: '📷' },
  sparkles: { src: fluent('Sparkles'), native: '✨' },
  night: { src: fluent('Night with stars'), native: '🌃' },
} as const

export type EmojiKey = keyof typeof EMOJI

export type Stat = { label: L; value: L }

export type Body = {
  id: string
  emoji: EmojiKey
  name: L
  tagline: L
  stats: Stat[]
  paragraphs: L[]
  /** 详情页图片：把图片网址填进这个数组即可，例如 ['https://...jpg'] */
  images: string[]
}

export type Topic = {
  id: string
  href: string
  emoji: EmojiKey
  title: L
  desc: L
  /** If true, show on home page's category row (the rest are header-only nav). */
  featured?: boolean
}

export const TOPICS: Topic[] = [
  {
    id: 'solar',
    href: '/solar-system',
    emoji: 'saturn',
    featured: false,
    title: { zh: '太阳系', en: 'Solar System' },
    desc: { zh: '3D 俯瞰太阳与八大行星', en: 'A 3D tour of the Sun and eight planets' },
  },
  {
    id: 'small',
    href: '/small-bodies',
    emoji: 'comet',
    featured: false,
    title: { zh: '小天体', en: 'Small Bodies' },
    desc: { zh: '彗星、小行星、卫星与流星体', en: 'Comets, asteroids, moons and meteoroids' },
  },
  {
    id: 'story',
    href: '/universe',
    emoji: 'galaxy',
    featured: false,
    title: { zh: '宇宙的故事', en: 'Story of the Universe' },
    desc: { zh: '从 138 亿年前讲起', en: 'Starting 13.8 billion years ago' },
  },
  {
    id: 'quiz',
    href: '/quiz',
    emoji: 'quiz',
    featured: false,
    title: { zh: '问答', en: 'Quiz' },
    desc: { zh: '答题挑战与排行榜', en: 'Test yourself and top the board' },
  },
  {
    id: 'deep-sky',
    href: '/deep-sky',
    emoji: 'camera',
    featured: true,
    title: { zh: '深空摄影', en: 'Deep-Sky Photography' },
    desc: { zh: '哈勃/韦伯视觉奇观，沉浸式美术馆', en: 'Hubble/JWST wonders, an immersive gallery' },
  },
  {
    id: 'star-life',
    href: '/star-life',
    emoji: 'star',
    featured: true,
    title: { zh: '星的一生', en: 'Life of Stars' },
    desc: { zh: '宇宙的一生变为星的故事，分叉图动画', en: 'The universe as the story of stars, animated branching' },
  },
  {
    id: 'tonight',
    href: '/tonight',
    emoji: 'night',
    featured: true,
    title: { zh: '今晚星空', en: 'Tonight\'s Sky' },
    desc: { zh: '小白向的浪漫观星与天象指南', en: 'A beginner-friendly stargazing & sky guide' },
  },
]

export type Slide = { src: string; title: L; caption: L }

export const SLIDES: Slide[] = [
  {
    src: '/featured/1.jpg',
    title: { zh: '南环星云', en: 'Southern Ring Nebula' },
    caption: { zh: '一颗垂死恒星抛出的气体外壳，由詹姆斯·韦布空间望远镜拍摄。', en: 'Gas shells cast off by a dying star, captured by the James Webb Space Telescope.' },
  },
  {
    src: '/featured/2.jpg',
    title: { zh: '创生之柱', en: 'Pillars of Creation' },
    caption: { zh: '鹰状星云中高耸的气体尘埃柱，新的恒星正在其中诞生。', en: 'Towering columns of gas and dust in the Eagle Nebula, where new stars are being born.' },
  },
  {
    src: '/featured/3.jpg',
    title: { zh: '韦斯特隆德 2 星团', en: 'Westerlund 2' },
    caption: { zh: '年轻的巨型星团照亮周围的星云，宛如一场宇宙烟花。', en: 'A young giant star cluster lights up its surrounding nebula like cosmic fireworks.' },
  },
  {
    src: '/featured/4.jpg',
    title: { zh: '螺旋星系', en: 'Spiral Galaxy' },
    caption: { zh: '数千亿颗恒星沿着旋臂缓缓旋转，银河系也是这样的螺旋星系。', en: 'Hundreds of billions of stars swirl along its arms. Our Milky Way is a spiral like this.' },
  },
  {
    src: '/featured/5.jpg',
    title: { zh: '夜晚的地球', en: 'Earth at Night' },
    caption: { zh: '从国际空间站俯瞰，城市灯火勾勒出大陆的轮廓。', en: 'Seen from the International Space Station, city lights trace the outlines of continents.' },
  },
]

export type PlanetVisual = { color: string; size: number; orbit: number; speed: number; ring?: boolean }

export const PLANET_VISUALS: Record<string, PlanetVisual> = {
  mercury: { color: '#B9B2A8', size: 0.28, orbit: 3.2, speed: 1.6 },
  venus: { color: '#E8C98A', size: 0.42, orbit: 4.4, speed: 1.2 },
  earth: { color: '#4F8FE0', size: 0.45, orbit: 5.7, speed: 1.0 },
  mars: { color: '#D46A43', size: 0.34, orbit: 7.0, speed: 0.8 },
  jupiter: { color: '#D9B48A', size: 0.95, orbit: 9.2, speed: 0.45 },
  saturn: { color: '#E6D3A3', size: 0.8, orbit: 11.6, speed: 0.33, ring: true },
  uranus: { color: '#9FE3EA', size: 0.6, orbit: 13.6, speed: 0.24 },
  neptune: { color: '#4A6FE3', size: 0.58, orbit: 15.4, speed: 0.18 },
}

export const SOLAR_BODIES: Body[] = [
  {
    id: 'sun',
    emoji: 'sun',
    name: { zh: '太阳', en: 'Sun' },
    tagline: { zh: '太阳系的中心恒星，占太阳系总质量的 99.86%。', en: 'The star at the center, holding 99.86% of the Solar System’s mass.' },
    stats: [
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '约 139 万 km', en: '~1.39 million km' } },
      { label: { zh: '表面温度', en: 'Surface temp' }, value: { zh: '约 5500 °C', en: '~5,500 °C' } },
      { label: { zh: '年龄', en: 'Age' }, value: { zh: '约 46 亿年', en: '~4.6 billion yrs' } },
    ],
    paragraphs: [
      {
        zh: '太阳是一颗 G 型主序星（黄矮星），由约 73% 的氢和 25% 的氦组成。它的核心温度高达约 1500 万 °C，每秒把约 6 亿吨氢聚变成氦，释放出的能量以光和热的形式照亮整个太阳系。',
        en: 'The Sun is a G-type main-sequence star (a yellow dwarf) made of about 73% hydrogen and 25% helium. Its core reaches about 15 million °C, fusing roughly 600 million tonnes of hydrogen into helium every second. That energy lights and warms the whole Solar System.',
      },
      {
        zh: '阳光从太阳表面到达地球大约需要 8 分 20 秒。太阳表面会出现黑子、耀斑和日珥，太阳风则不断向外吹出带电粒子，与地球磁场相互作用形成极光。',
        en: 'Sunlight takes about 8 minutes and 20 seconds to reach Earth. Sunspots, flares and prominences appear on its surface, and the solar wind constantly streams charged particles outward, creating auroras when it meets Earth’s magnetic field.',
      },
      {
        zh: '太阳已经度过了大约一半的寿命。再过约 50 亿年，它会膨胀成红巨星，最终抛出外层，留下一颗白矮星。',
        en: 'The Sun is about halfway through its life. In roughly 5 billion years it will swell into a red giant, shed its outer layers, and leave behind a white dwarf.',
      },
    ],
    images: [],
  },
  {
    id: 'mercury',
    emoji: 'mercury',
    name: { zh: '水星', en: 'Mercury' },
    tagline: { zh: '离太阳最近、也是最小的行星。', en: 'The smallest planet and the closest to the Sun.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '0.39 AU', en: '0.39 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '4,879 km', en: '4,879 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '88 天', en: '88 days' } },
    ],
    paragraphs: [
      {
        zh: '水星表面布满撞击坑，外观和月球很像。它几乎没有大气层，无法保存热量，白天温度可达 430 °C，夜晚却会降到 −180 °C，是太阳系昼夜温差最大的行星。',
        en: 'Mercury’s surface is covered in craters, much like the Moon. With almost no atmosphere to hold heat, daytime temperatures reach 430 °C while nights fall to −180 °C — the largest day–night swing of any planet.',
      },
      {
        zh: '水星自转很慢：它绕太阳转两圈，自己才转三圈。所以在水星上，一个“太阳日”约等于 176 个地球日，比它的一年还长。',
        en: 'Mercury spins slowly: it rotates three times for every two trips around the Sun. One solar day on Mercury lasts about 176 Earth days — longer than its year.',
      },
    ],
    images: [],
  },
  {
    id: 'venus',
    emoji: 'venus',
    name: { zh: '金星', en: 'Venus' },
    tagline: { zh: '最热的行星，浓厚大气形成失控温室效应。', en: 'The hottest planet, wrapped in a runaway greenhouse.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '0.72 AU', en: '0.72 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '12,104 km', en: '12,104 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '225 天', en: '225 days' } },
    ],
    paragraphs: [
      {
        zh: '金星大小与地球相近，被称为地球的“姐妹星”。但它的大气 96% 是二氧化碳，地表气压约为地球的 92 倍，表面温度约 465 °C，比水星还热。',
        en: 'Venus is close to Earth in size and is often called Earth’s “sister planet.” But its atmosphere is 96% carbon dioxide, surface pressure is about 92 times Earth’s, and the surface sits near 465 °C — hotter than Mercury.',
      },
      {
        zh: '金星的自转方向与大多数行星相反，而且自转一圈需要 243 个地球日，比它绕太阳一圈还久。它是夜空中除月亮外最亮的天体，常被称作“启明星”或“长庚星”。',
        en: 'Venus spins backward compared with most planets, and one rotation takes 243 Earth days — longer than its year. After the Moon, it is the brightest object in the night sky, known as the “Morning Star” or “Evening Star.”',
      },
    ],
    images: [],
  },
  {
    id: 'earth',
    emoji: 'earth',
    name: { zh: '地球', en: 'Earth' },
    tagline: { zh: '我们的家园，目前已知唯一存在生命的星球。', en: 'Our home — the only world known to host life.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '1 AU', en: '1 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '12,742 km', en: '12,742 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '365.25 天', en: '365.25 days' } },
    ],
    paragraphs: [
      {
        zh: '地球约 71% 的表面被海洋覆盖，是太阳系中唯一表面拥有稳定液态水的行星。大气以氮气（78%）和氧气（21%）为主，臭氧层阻挡了大部分有害紫外线。',
        en: 'About 71% of Earth’s surface is ocean, making it the only planet with stable liquid water on its surface. Its air is mostly nitrogen (78%) and oxygen (21%), and the ozone layer blocks most harmful ultraviolet light.',
      },
      {
        zh: '地球的液态铁外核产生磁场，像一面盾牌抵挡太阳风。地轴倾斜约 23.4°，带来了四季变化；唯一的天然卫星月球则稳定了地轴并引起潮汐。',
        en: 'Earth’s liquid iron outer core generates a magnetic field that shields us from the solar wind. Its 23.4° axial tilt gives us seasons, and our only natural satellite, the Moon, steadies that tilt and drives the tides.',
      },
    ],
    images: [],
  },
  {
    id: 'mars',
    emoji: 'mars',
    name: { zh: '火星', en: 'Mars' },
    tagline: { zh: '红色星球，拥有太阳系最高的火山。', en: 'The Red Planet, home to the tallest volcano in the Solar System.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '1.52 AU', en: '1.52 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '6,779 km', en: '6,779 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '687 天', en: '687 days' } },
    ],
    paragraphs: [
      {
        zh: '火星表面富含氧化铁（铁锈），因此呈红色。它有两颗小卫星：火卫一和火卫二。火星上的奥林帕斯山高约 22 km，是地球珠穆朗玛峰的两倍多。',
        en: 'Mars looks red because its surface is rich in iron oxide — rust. It has two small moons, Phobos and Deimos. Its Olympus Mons rises about 22 km, more than twice the height of Mount Everest.',
      },
      {
        zh: '火星大气稀薄，主要是二氧化碳，平均温度约 −60 °C。干涸的河床和极地冰盖表明它过去可能有液态水，因此成为寻找生命痕迹和未来载人探索的重点目标。',
        en: 'Mars has a thin, mostly carbon dioxide atmosphere and an average temperature near −60 °C. Dry riverbeds and polar ice caps suggest it once had liquid water, making it a key target in the search for past life and for future human missions.',
      },
    ],
    images: [],
  },
  {
    id: 'jupiter',
    emoji: 'jupiter',
    name: { zh: '木星', en: 'Jupiter' },
    tagline: { zh: '太阳系最大的行星，一个巨大的气态世界。', en: 'The largest planet — a giant world of gas.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '5.2 AU', en: '5.2 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '139,820 km', en: '139,820 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '11.9 年', en: '11.9 years' } },
    ],
    paragraphs: [
      {
        zh: '木星主要由氢和氦组成，质量是其他所有行星总和的 2.5 倍，能装下 1300 多个地球。它的大红斑是一场比地球还大的风暴，已经持续了至少 350 年。',
        en: 'Jupiter is mostly hydrogen and helium, with 2.5 times the mass of all the other planets combined — more than 1,300 Earths could fit inside. Its Great Red Spot is a storm larger than Earth that has raged for at least 350 years.',
      },
      {
        zh: '木星自转一圈不到 10 小时，是自转最快的行星。它拥有 90 多颗卫星，其中木卫三是太阳系最大的卫星，木卫二冰层下可能藏着液态海洋。',
        en: 'Jupiter spins once in under 10 hours, faster than any other planet. It has more than 90 moons; Ganymede is the largest moon in the Solar System, and Europa may hide a liquid ocean beneath its ice.',
      },
    ],
    images: [],
  },
  {
    id: 'saturn',
    emoji: 'saturn',
    name: { zh: '土星', en: 'Saturn' },
    tagline: { zh: '拥有壮观光环的气态巨行星。', en: 'The gas giant with spectacular rings.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '9.5 AU', en: '9.5 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '116,460 km', en: '116,460 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '29.5 年', en: '29.5 years' } },
    ],
    paragraphs: [
      {
        zh: '土星的光环主要由冰块和岩石碎片组成，宽度超过 27 万 km，但平均厚度只有约 10 米。土星的平均密度比水还小，理论上可以“浮”在水面上。',
        en: 'Saturn’s rings are made mostly of ice chunks and rocky debris. They stretch more than 270,000 km across yet are only about 10 meters thick on average. Saturn’s average density is lower than water — in theory, it could float.',
      },
      {
        zh: '土星有 140 多颗已知卫星。土卫六（泰坦）拥有浓厚的大气和液态甲烷湖泊；土卫二会从南极喷出水冰羽流，是寻找地外生命的热门目标。',
        en: 'Saturn has more than 140 known moons. Titan has a thick atmosphere and lakes of liquid methane, while Enceladus sprays plumes of water ice from its south pole, making it a top target in the search for life.',
      },
    ],
    images: [],
  },
  {
    id: 'uranus',
    emoji: 'uranus',
    name: { zh: '天王星', en: 'Uranus' },
    tagline: { zh: '“躺着”自转的冰巨星。', en: 'The ice giant that spins on its side.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '19.2 AU', en: '19.2 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '50,724 km', en: '50,724 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '84 年', en: '84 years' } },
    ],
    paragraphs: [
      {
        zh: '天王星的自转轴倾斜约 98°，几乎是侧躺着绕太阳运行，科学家推测这可能源于远古时期的一次巨大撞击。因此它的两极会经历长达 42 年的极昼和极夜。',
        en: 'Uranus is tilted about 98°, so it orbits the Sun almost on its side — possibly the result of a giant ancient collision. Each pole endures about 42 years of continuous daylight followed by 42 years of darkness.',
      },
      {
        zh: '天王星大气中的甲烷吸收红光，使它呈现青蓝色。它是太阳系中最冷的行星大气之一，最低温度约 −224 °C，也是第一颗用望远镜发现的行星（1781 年）。',
        en: 'Methane in its atmosphere absorbs red light, giving Uranus its cyan color. It has one of the coldest planetary atmospheres, dipping to about −224 °C, and was the first planet discovered with a telescope, in 1781.',
      },
    ],
    images: [],
  },
  {
    id: 'neptune',
    emoji: 'neptune',
    name: { zh: '海王星', en: 'Neptune' },
    tagline: { zh: '离太阳最远的行星，风速全太阳系最快。', en: 'The farthest planet, with the fastest winds.' },
    stats: [
      { label: { zh: '距太阳', en: 'From Sun' }, value: { zh: '30.1 AU', en: '30.1 AU' } },
      { label: { zh: '直径', en: 'Diameter' }, value: { zh: '49,244 km', en: '49,244 km' } },
      { label: { zh: '公转周期', en: 'Year' }, value: { zh: '165 年', en: '165 years' } },
    ],
    paragraphs: [
      {
        zh: '海王星是第一颗通过数学计算预测、随后才被观测到的行星（1846 年）。它呈深蓝色，大气中的风速可达每小时 2000 km 以上，是太阳系中最狂暴的风。',
        en: 'Neptune was the first planet predicted by mathematics before it was seen, in 1846. Deep blue in color, it has winds topping 2,000 km per hour — the most violent in the Solar System.',
      },
      {
        zh: '海王星最大的卫星海卫一（特里同）逆向绕行，很可能是被海王星引力捕获的柯伊伯带天体。自 1846 年被发现以来，海王星直到 2011 年才绕太阳完整转了一圈。',
        en: 'Its largest moon, Triton, orbits backward and was probably a Kuiper Belt object captured by Neptune’s gravity. After its discovery in 1846, Neptune did not complete a full orbit until 2011.',
      },
    ],
    images: [],
  },
]

export const SMALL_BODIES: Body[] = [
  {
    id: 'comet',
    emoji: 'comet',
    name: { zh: '彗星', en: 'Comets' },
    tagline: { zh: '“脏雪球”，靠近太阳时拖出长长的尾巴。', en: '“Dirty snowballs” that grow long tails near the Sun.' },
    stats: [
      { label: { zh: '成分', en: 'Made of' }, value: { zh: '冰、尘埃、岩石', en: 'Ice, dust, rock' } },
      { label: { zh: '彗核大小', en: 'Nucleus' }, value: { zh: '约 1–50 km', en: '~1–50 km' } },
      { label: { zh: '来源', en: 'Origin' }, value: { zh: '柯伊伯带 / 奥尔特云', en: 'Kuiper Belt / Oort Cloud' } },
    ],
    paragraphs: [
      {
        zh: '彗星的核心叫彗核，由冰、尘埃和岩石混合而成。当它靠近太阳时，冰会升华成气体，在彗核周围形成明亮的彗发，并被太阳风和辐射压吹出两条尾巴：弯曲的尘埃尾和笔直的离子尾。彗尾总是背向太阳。',
        en: 'A comet’s core, the nucleus, is a mix of ice, dust and rock. As it nears the Sun, the ice turns to gas and forms a glowing coma. Solar wind and radiation push out two tails — a curved dust tail and a straight ion tail — that always point away from the Sun.',
      },
      {
        zh: '短周期彗星（如每 76 年回归一次的哈雷彗星）多来自柯伊伯带，长周期彗星则来自太阳系最外围的奥尔特云。彗星保存着太阳系诞生时的原始物质，是研究太阳系起源的“时间胶囊”。',
        en: 'Short-period comets, like Halley’s Comet which returns every 76 years, mostly come from the Kuiper Belt. Long-period comets come from the distant Oort Cloud. Comets preserve material from the Solar System’s birth, making them time capsules of its origin.',
      },
    ],
    images: [],
  },
  {
    id: 'asteroid',
    emoji: 'asteroid',
    name: { zh: '小行星', en: 'Asteroids' },
    tagline: { zh: '绕太阳运行的岩石与金属天体。', en: 'Rocky and metallic bodies orbiting the Sun.' },
    stats: [
      { label: { zh: '已知数量', en: 'Known' }, value: { zh: '超过 130 万颗', en: '1.3 million+' } },
      { label: { zh: '最大', en: 'Largest' }, value: { zh: '谷神星 ~940 km', en: 'Ceres ~940 km' } },
      { label: { zh: '主要分布', en: 'Main zone' }, value: { zh: '火星与木星之间', en: 'Between Mars & Jupiter' } },
    ],
    paragraphs: [
      {
        zh: '大多数小行星位于火星与木星之间的主小行星带。它们是太阳系形成时没能聚合成行星的残余物质。虽然数量庞大，但小行星带非常空旷，所有小行星的总质量还不到月球的 3%。',
        en: 'Most asteroids live in the main belt between Mars and Jupiter — leftovers that never came together into a planet. Despite their numbers, the belt is mostly empty space, and all asteroids combined weigh less than 3% of the Moon.',
      },
      {
        zh: '有些小行星的轨道会接近地球，被称为近地小行星。科学家持续监测它们，2022 年 NASA 的 DART 任务成功撞击小行星“迪莫弗斯”，首次验证了改变小行星轨道的行星防御技术。',
        en: 'Some asteroids come close to Earth and are called near-Earth asteroids. Scientists track them closely. In 2022, NASA’s DART mission struck the asteroid Dimorphos and changed its orbit — the first real test of planetary defense.',
      },
    ],
    images: [],
  },
  {
    id: 'moon',
    emoji: 'moon',
    name: { zh: '卫星', en: 'Moons' },
    tagline: { zh: '绕行星运行的天然天体。', en: 'Natural bodies that orbit planets.' },
    stats: [
      { label: { zh: '已知数量', en: 'Known' }, value: { zh: '超过 290 颗', en: '290+' } },
      { label: { zh: '最大', en: 'Largest' }, value: { zh: '木卫三 5,268 km', en: 'Ganymede 5,268 km' } },
      { label: { zh: '最多', en: 'Most moons' }, value: { zh: '土星', en: 'Saturn' } },
    ],
    paragraphs: [
      {
        zh: '卫星是围绕行星或矮行星运行的天然天体。太阳系中，水星和金星没有卫星，地球有一颗月球，而土星和木星则各自拥有上百颗或近百颗卫星。月球很可能是约 45 亿年前一个火星大小的天体撞击原始地球后形成的。',
        en: 'Moons are natural bodies orbiting planets or dwarf planets. Mercury and Venus have none, Earth has one, while Saturn and Jupiter each have around a hundred or more. Our Moon likely formed about 4.5 billion years ago when a Mars-sized body slammed into the young Earth.',
      },
      {
        zh: '卫星世界千姿百态：木卫一火山活动频繁，木卫二和土卫二冰层下藏着海洋，土卫六有浓厚大气和甲烷湖。这些卫星是寻找地外生命的重要候选地。',
        en: 'Moons are wonderfully diverse: Io is covered in active volcanoes, Europa and Enceladus hide oceans under their ice, and Titan has a thick atmosphere and methane lakes. These worlds are prime candidates in the search for life beyond Earth.',
      },
    ],
    images: [],
  },
  {
    id: 'meteoroid',
    emoji: 'meteoroid',
    name: { zh: '流星体', en: 'Meteoroids' },
    tagline: { zh: '太空中的小碎块，划过夜空就成了流星。', en: 'Tiny space debris that becomes a shooting star.' },
    stats: [
      { label: { zh: '大小', en: 'Size' }, value: { zh: '尘粒 ~ 1 米', en: 'Dust ~ 1 m' } },
      { label: { zh: '进入速度', en: 'Entry speed' }, value: { zh: '11–72 km/s', en: '11–72 km/s' } },
      { label: { zh: '来源', en: 'Origin' }, value: { zh: '彗星 / 小行星碎片', en: 'Comet / asteroid debris' } },
    ],
    paragraphs: [
      {
        zh: '流星体是在太空中运行的小块岩石或金属，通常来自彗星或小行星的碎片。当它高速冲进地球大气层，与空气剧烈摩擦发光，就形成了我们看到的流星。如果它没有烧尽、落到地面，就被称为陨石。',
        en: 'Meteoroids are small chunks of rock or metal in space, usually debris from comets or asteroids. When one plunges into Earth’s atmosphere at high speed, it heats up and glows — that streak is a meteor. If a piece survives and lands, it is called a meteorite.',
      },
      {
        zh: '当地球穿过彗星留下的碎屑带时，就会出现流星雨，例如每年 8 月的英仙座流星雨和 12 月的双子座流星雨。每天约有数十吨宇宙尘埃落到地球上。',
        en: 'When Earth passes through a trail of comet debris, we see a meteor shower, such as the Perseids every August and the Geminids every December. Dozens of tonnes of cosmic dust fall on Earth every day.',
      },
    ],
    images: [],
  },
]

export const UNIVERSE_STORY: L = {
  zh: '宇宙起源的主流科学解释是大爆炸理论。约138亿年前，宇宙处于极高温、极高密度状态，随后空间本身开始膨胀并逐渐冷却。最初几分钟，质子和中子结合，形成氢、氦和少量锂等轻元素。约38万年后，温度降到足以让电子与原子核结合，光子得以自由传播，形成今天观测到的宇宙微波背景辐射。之后，物质在引力作用下聚集，逐渐形成恒星、星系和宇宙大尺度结构。恒星内部通过核聚变合成碳、氧、铁等重元素，超新星爆发又把它们散布到星际空间。约46亿年前，太阳系从一团分子云中形成。需要强调：大爆炸不是“在空间某一点发生的爆炸”，而是整个空间在膨胀；它也不解释宇宙“之前”发生了什么。我们身体中的重元素，大多来自历代恒星。',
  en: 'The mainstream scientific explanation for the origin of the universe is the Big Bang theory. About 13.8 billion years ago, the universe was extremely hot and dense. Then space itself began to expand and cool. In the first few minutes, protons and neutrons combined to form light elements such as hydrogen, helium, and a small amount of lithium. About 380,000 years later, the temperature dropped enough for electrons to combine with atomic nuclei, allowing photons to travel freely and forming the cosmic microwave background radiation we observe today. After that, matter clustered under gravity, gradually forming stars, galaxies, and large-scale cosmic structures. Inside stars, nuclear fusion produced heavier elements such as carbon, oxygen, and iron; supernova explosions scattered them into interstellar space. About 4.6 billion years ago, the Solar System formed from a cloud of molecular gas. It is important to note: the Big Bang was not an explosion at a single point in space, but the expansion of all space; it does not explain what happened “before” the universe. Most heavy elements in our bodies came from generations of stars.',
}

export const TIMELINE: { time: L; event: L }[] = [
  { time: { zh: '138 亿年前', en: '13.8 Bya' }, event: { zh: '大爆炸，空间开始膨胀', en: 'Big Bang — space begins expanding' } },
  { time: { zh: '最初几分钟', en: 'First minutes' }, event: { zh: '形成氢、氦、锂', en: 'Hydrogen, helium, lithium form' } },
  { time: { zh: '38 万年后', en: '380,000 yrs' }, event: { zh: '宇宙微波背景辐射', en: 'Cosmic microwave background' } },
  { time: { zh: '数亿年后', en: '~100s of Myrs' }, event: { zh: '第一代恒星与星系', en: 'First stars and galaxies' } },
  { time: { zh: '46 亿年前', en: '4.6 Bya' }, event: { zh: '太阳系诞生', en: 'Solar System is born' } },
]

export type LifeStage = { title: L; text: L }
export type LifeStory = Body & { stages: LifeStage[] }

export const LIFE_STORIES: LifeStory[] = [
  {
    id: 'star-life',
    emoji: 'star',
    name: { zh: '恒星的一生', en: 'Life of a Star' },
    tagline: { zh: '从星云中诞生，到白矮星、中子星或黑洞。', en: 'Born in a nebula, ending as a white dwarf, neutron star or black hole.' },
    stats: [],
    paragraphs: [
      {
        zh: '恒星的一生长短和结局，几乎完全由它出生时的质量决定。质量越大，燃烧越猛烈，寿命反而越短。',
        en: 'A star’s lifespan and fate depend almost entirely on its mass at birth. The more massive a star, the fiercer it burns — and the shorter it lives.',
      },
    ],
    stages: [
      {
        title: { zh: '1. 星云', en: '1. Nebula' },
        text: { zh: '恒星诞生于由气体和尘埃组成的巨大分子云。云中密度较高的区域在引力作用下开始收缩。', en: 'Stars are born in vast molecular clouds of gas and dust. Denser pockets begin to collapse under their own gravity.' },
      },
      {
        title: { zh: '2. 原恒星', en: '2. Protostar' },
        text: { zh: '收缩的气团越来越热、越来越密，形成发光的原恒星，周围常伴有旋转的气体盘——行星就在这里孕育。', en: 'The collapsing clump grows hotter and denser, forming a glowing protostar, often surrounded by a spinning disk where planets can form.' },
      },
      {
        title: { zh: '3. 主序星', en: '3. Main sequence' },
        text: { zh: '核心温度达到约 1000 万 °C 时，氢聚变成氦，恒星进入稳定的“壮年期”。这一阶段占恒星寿命的约 90%，太阳目前就处于这个阶段。', en: 'When the core reaches about 10 million °C, hydrogen fuses into helium and the star enters its stable prime. This stage takes about 90% of its life — the Sun is here now.' },
      },
      {
        title: { zh: '4. 红巨星 / 红超巨星', en: '4. Red giant / supergiant' },
        text: { zh: '核心的氢耗尽后，恒星外层膨胀、变冷变红。大质量恒星会继续聚变出碳、氧，直到铁。', en: 'Once core hydrogen runs out, the outer layers swell, cool and redden. Massive stars keep fusing heavier elements — carbon, oxygen, all the way to iron.' },
      },
      {
        title: { zh: '5. 结局：小质量恒星', en: '5. Fate: low-mass stars' },
        text: { zh: '像太阳这样的恒星会温和地抛出外层，形成美丽的行星状星云，留下一颗地球大小、非常致密的白矮星，然后慢慢冷却。', en: 'Stars like the Sun gently shed their outer layers into a glowing planetary nebula, leaving an Earth-sized, ultra-dense white dwarf that slowly cools.' },
      },
      {
        title: { zh: '6. 结局：大质量恒星', en: '6. Fate: massive stars' },
        text: { zh: '质量超过太阳约 8 倍的恒星会发生超新星爆发，把重元素抛洒到宇宙中。核心坍缩成中子星；如果质量更大，就会成为连光都无法逃脱的黑洞。', en: 'Stars over about 8 solar masses explode as supernovae, scattering heavy elements into space. The core collapses into a neutron star — or, if heavy enough, a black hole from which not even light escapes.' },
      },
    ],
    images: [],
  },
  {
    id: 'planet-life',
    emoji: 'planetLife',
    name: { zh: '行星的一生', en: 'Life of a Planet' },
    tagline: { zh: '从尘埃盘中聚合，在恒星的命运中走向终点。', en: 'Built from a dusty disk, and bound to the fate of its star.' },
    stats: [],
    paragraphs: [
      {
        zh: '行星是恒星诞生的“副产品”。它们的形成、演化和最终命运，都与母恒星紧紧相连。',
        en: 'Planets are by-products of star birth. Their formation, evolution and final fate are tightly linked to their parent star.',
      },
    ],
    stages: [
      {
        title: { zh: '1. 原行星盘', en: '1. Protoplanetary disk' },
        text: { zh: '新生恒星周围环绕着扁平的气体尘埃盘。约 46 亿年前，太阳周围也有这样一个盘。', en: 'A flat disk of gas and dust circles a newborn star. About 4.6 billion years ago, the young Sun had one too.' },
      },
      {
        title: { zh: '2. 星子', en: '2. Planetesimals' },
        text: { zh: '尘埃颗粒相互碰撞、粘连，逐渐长成几千米大小的“星子”，再通过引力吸积更多物质。', en: 'Dust grains collide and stick together, growing into kilometer-sized planetesimals that pull in more material with gravity.' },
      },
      {
        title: { zh: '3. 原行星与碰撞', en: '3. Protoplanets & collisions' },
        text: { zh: '星子合并成原行星。靠近恒星的地方太热，只能形成岩石行星；远处足够冷，冰和气体聚集成巨行星。剧烈的撞击塑造了行星，月球也可能由此诞生。', en: 'Planetesimals merge into protoplanets. Close to the star it is too hot for ice, so rocky planets form; farther out, ice and gas build giant planets. Violent impacts shape them — and may have created our Moon.' },
      },
      {
        title: { zh: '4. 分化与演化', en: '4. Differentiation & evolution' },
        text: { zh: '年轻行星内部熔融，重的铁沉入核心，轻的岩石浮到外层。火山释放气体形成大气，在合适的条件下出现海洋，甚至生命。', en: 'Young planets melt inside: heavy iron sinks to form a core while lighter rock rises. Volcanoes release gases that build an atmosphere, and in the right conditions oceans — even life — appear.' },
      },
      {
        title: { zh: '5. 漫长的稳定期', en: '5. The long middle age' },
        text: { zh: '行星可以稳定存在数十亿年。期间小行星撞击、板块运动和气候变化不断改变它的面貌。', en: 'Planets can stay stable for billions of years, while impacts, plate tectonics and climate shifts keep reshaping their surfaces.' },
      },
      {
        title: { zh: '6. 终点', en: '6. The end' },
        text: { zh: '当母恒星变成红巨星，内侧行星可能被吞没或烤焦，外侧行星则可能幸存，继续绕着白矮星运行，或被抛入星际空间成为“流浪行星”。', en: 'When the star becomes a red giant, inner planets may be swallowed or scorched. Outer planets may survive, circling the white dwarf — or be flung into interstellar space as rogue planets.' },
      },
    ],
    images: [],
  },
]

export type Question = { q: L; options: L[]; answer: number; explain: L }

export const QUESTIONS: Question[] = [
  {
    q: { zh: '太阳系中最大的行星是哪一颗？', en: 'Which is the largest planet in the Solar System?' },
    options: [{ zh: '土星', en: 'Saturn' }, { zh: '木星', en: 'Jupiter' }, { zh: '海王星', en: 'Neptune' }, { zh: '地球', en: 'Earth' }],
    answer: 1,
    explain: { zh: '木星直径约 14 万 km，能装下 1300 多个地球。', en: 'Jupiter is about 140,000 km across — over 1,300 Earths could fit inside.' },
  },
  {
    q: { zh: '哪颗行星表面温度最高？', en: 'Which planet has the hottest surface?' },
    options: [{ zh: '水星', en: 'Mercury' }, { zh: '火星', en: 'Mars' }, { zh: '金星', en: 'Venus' }, { zh: '木星', en: 'Jupiter' }],
    answer: 2,
    explain: { zh: '金星浓厚的二氧化碳大气造成失控温室效应，表面约 465 °C。', en: 'Venus’s thick CO₂ atmosphere traps heat, keeping the surface near 465 °C.' },
  },
  {
    q: { zh: '阳光从太阳到达地球大约需要多久？', en: 'How long does sunlight take to reach Earth?' },
    options: [{ zh: '8 秒', en: '8 seconds' }, { zh: '8 分钟', en: '8 minutes' }, { zh: '8 小时', en: '8 hours' }, { zh: '8 天', en: '8 days' }],
    answer: 1,
    explain: { zh: '约 8 分 20 秒。', en: 'About 8 minutes and 20 seconds.' },
  },
  {
    q: { zh: '火星呈红色的主要原因是？', en: 'Why does Mars look red?' },
    options: [{ zh: '表面有大量氧化铁', en: 'Its surface is rich in iron oxide' }, { zh: '大气在燃烧', en: 'Its atmosphere is burning' }, { zh: '离太阳很近', en: 'It is close to the Sun' }, { zh: '被红色光环包围', en: 'It has red rings' }],
    answer: 0,
    explain: { zh: '火星地表富含氧化铁，也就是铁锈。', en: 'The Martian surface is full of iron oxide — rust.' },
  },
  {
    q: { zh: '“躺着”绕太阳转、自转轴倾斜约 98° 的行星是？', en: 'Which planet orbits on its side, tilted about 98°?' },
    options: [{ zh: '海王星', en: 'Neptune' }, { zh: '土星', en: 'Saturn' }, { zh: '天王星', en: 'Uranus' }, { zh: '金星', en: 'Venus' }],
    answer: 2,
    explain: { zh: '天王星可能在远古时期受到巨大撞击而侧倒。', en: 'Uranus may have been knocked over by a giant ancient impact.' },
  },
  {
    q: { zh: '彗星的尾巴总是指向哪个方向？', en: 'Which way does a comet’s tail always point?' },
    options: [{ zh: '运动方向', en: 'Its direction of travel' }, { zh: '背向太阳', en: 'Away from the Sun' }, { zh: '指向地球', en: 'Toward Earth' }, { zh: '随机', en: 'Randomly' }],
    answer: 1,
    explain: { zh: '太阳风和辐射压把彗尾推向背离太阳的方向。', en: 'Solar wind and radiation pressure push the tail away from the Sun.' },
  },
  {
    q: { zh: '主小行星带位于哪两颗行星之间？', en: 'The main asteroid belt lies between which two planets?' },
    options: [{ zh: '地球和火星', en: 'Earth and Mars' }, { zh: '木星和土星', en: 'Jupiter and Saturn' }, { zh: '火星和木星', en: 'Mars and Jupiter' }, { zh: '金星和地球', en: 'Venus and Earth' }],
    answer: 2,
    explain: { zh: '主小行星带位于火星与木星轨道之间。', en: 'The main belt sits between the orbits of Mars and Jupiter.' },
  },
  {
    q: { zh: '流星体落到地面后被称为？', en: 'A meteoroid that reaches the ground is called a…' },
    options: [{ zh: '流星', en: 'Meteor' }, { zh: '陨石', en: 'Meteorite' }, { zh: '彗星', en: 'Comet' }, { zh: '小行星', en: 'Asteroid' }],
    answer: 1,
    explain: { zh: '在大气中发光的是流星，落地的残骸是陨石。', en: 'The streak of light is a meteor; the piece that lands is a meteorite.' },
  },
  {
    q: { zh: '太阳系中最大的卫星是？', en: 'What is the largest moon in the Solar System?' },
    options: [{ zh: '月球', en: 'The Moon' }, { zh: '土卫六', en: 'Titan' }, { zh: '木卫三', en: 'Ganymede' }, { zh: '海卫一', en: 'Triton' }],
    answer: 2,
    explain: { zh: '木卫三直径约 5268 km，比水星还大。', en: 'Ganymede is about 5,268 km across — bigger than Mercury.' },
  },
  {
    q: { zh: '根据大爆炸理论，宇宙大约诞生于多少年前？', en: 'According to the Big Bang theory, how old is the universe?' },
    options: [{ zh: '46 亿年', en: '4.6 billion years' }, { zh: '138 亿年', en: '13.8 billion years' }, { zh: '1 万年', en: '10,000 years' }, { zh: '1000 亿年', en: '100 billion years' }],
    answer: 1,
    explain: { zh: '约 138 亿年前；46 亿年是太阳系的年龄。', en: 'About 13.8 billion years; 4.6 billion is the age of the Solar System.' },
  },
  {
    q: { zh: '宇宙微波背景辐射大约形成于大爆炸后多久？', en: 'When did the cosmic microwave background form after the Big Bang?' },
    options: [{ zh: '3 分钟', en: '3 minutes' }, { zh: '38 万年', en: '380,000 years' }, { zh: '10 亿年', en: '1 billion years' }, { zh: '46 亿年', en: '4.6 billion years' }],
    answer: 1,
    explain: { zh: '约 38 万年后，电子与原子核结合，光子得以自由传播。', en: 'About 380,000 years later, electrons joined nuclei and light could travel freely.' },
  },
  {
    q: { zh: '像太阳这样的恒星，生命终点通常会变成？', en: 'A star like the Sun usually ends its life as a…' },
    options: [{ zh: '黑洞', en: 'Black hole' }, { zh: '中子星', en: 'Neutron star' }, { zh: '白矮星', en: 'White dwarf' }, { zh: '新的行星', en: 'New planet' }],
    answer: 2,
    explain: { zh: '小质量恒星抛出外层后留下白矮星；大质量恒星才会形成中子星或黑洞。', en: 'Low-mass stars leave white dwarfs; only massive stars become neutron stars or black holes.' },
  },
  {
    q: { zh: '我们身体中的重元素（如碳、氧、铁）大多来自哪里？', en: 'Where did most heavy elements in our bodies come from?' },
    options: [{ zh: '大爆炸最初几分钟', en: 'The first minutes of the Big Bang' }, { zh: '历代恒星', en: 'Generations of stars' }, { zh: '地球内部', en: 'Earth’s interior' }, { zh: '月球', en: 'The Moon' }],
    answer: 1,
    explain: { zh: '恒星核聚变合成重元素，超新星爆发将它们散布到宇宙中。', en: 'Stars forge heavy elements by fusion; supernovae scatter them through space.' },
  },
  {
    q: { zh: '哪颗行星的平均密度比水还小？', en: 'Which planet is less dense than water?' },
    options: [{ zh: '土星', en: 'Saturn' }, { zh: '地球', en: 'Earth' }, { zh: '火星', en: 'Mars' }, { zh: '水星', en: 'Mercury' }],
    answer: 0,
    explain: { zh: '土星平均密度约 0.69 g/cm³，理论上能浮在水上。', en: 'Saturn’s average density is about 0.69 g/cm³ — in theory, it could float.' },
  },
  {
    q: { zh: '第一颗通过数学计算预测后才被发现的行星是？', en: 'Which planet was predicted by math before being observed?' },
    options: [{ zh: '天王星', en: 'Uranus' }, { zh: '海王星', en: 'Neptune' }, { zh: '冥王星', en: 'Pluto' }, { zh: '木星', en: 'Jupiter' }],
    answer: 1,
    explain: { zh: '海王星于 1846 年根据天王星轨道的偏差被预测并发现。', en: 'Neptune was found in 1846 after its pull on Uranus’s orbit was calculated.' },
  },
]

export const QUIZ_ROUND = 10

// ---------------------------------------------------------------------------
// Deep-Sky Photography (Hubble / JWST immersive gallery)
// ---------------------------------------------------------------------------

export type DeepSkyItem = {
  id: string
  title: L
  source: L
  caption: L
  /** Before/after comparison: raw vs processed */
  beforeLabel: L
  afterLabel: L
  beforeImage: string
  afterImage: string
}

export const DEEP_SKY_ITEMS: DeepSkyItem[] = [
  {
    id: 'southern-ring',
    title: { zh: '南环星云', en: 'Southern Ring Nebula' },
    source: { zh: '詹姆斯·韦布空间望远镜', en: 'James Webb Space Telescope' },
    caption: { zh: '一颗垂死恒星抛出的气体外壳。（内容待补充）', en: 'Gas shells from a dying star. (Content coming soon)' },
    beforeLabel: { zh: '未加工', en: 'Raw' },
    afterLabel: { zh: '已加工', en: 'Processed' },
    beforeImage: '',
    afterImage: '/featured/1.jpg',
  },
  {
    id: 'pillars',
    title: { zh: '创生之柱', en: 'Pillars of Creation' },
    source: { zh: '詹姆斯·韦布空间望远镜', en: 'James Webb Space Telescope' },
    caption: { zh: '鹰状星云中高耸的气体尘埃柱。（内容待补充）', en: 'Towering gas and dust in the Eagle Nebula. (Content coming soon)' },
    beforeLabel: { zh: '未加工', en: 'Raw' },
    afterLabel: { zh: '已加工', en: 'Processed' },
    beforeImage: '',
    afterImage: '/featured/2.jpg',
  },
  {
    id: 'westerlund',
    title: { zh: '韦斯特隆德 2 星团', en: 'Westerlund 2' },
    source: { zh: '哈勃空间望远镜', en: 'Hubble Space Telescope' },
    caption: { zh: '年轻的巨型星团照亮周围星云。（内容待补充）', en: 'A young giant cluster lighting its nebula. (Content coming soon)' },
    beforeLabel: { zh: '未加工', en: 'Raw' },
    afterLabel: { zh: '已加工', en: 'Processed' },
    beforeImage: '',
    afterImage: '/featured/3.jpg',
  },
  {
    id: 'spiral-galaxy',
    title: { zh: '螺旋星系', en: 'Spiral Galaxy' },
    source: { zh: '哈勃空间望远镜', en: 'Hubble Space Telescope' },
    caption: { zh: '数千亿颗恒星沿旋臂旋转。（内容待补充）', en: 'Billions of stars swirling along spiral arms. (Content coming soon)' },
    beforeLabel: { zh: '未加工', en: 'Raw' },
    afterLabel: { zh: '已加工', en: 'Processed' },
    beforeImage: '',
    afterImage: '/featured/4.jpg',
  },
  {
    id: 'earth-night',
    title: { zh: '夜晚的地球', en: 'Earth at Night' },
    source: { zh: '国际空间站', en: 'International Space Station' },
    caption: { zh: '城市灯火勾勒出大陆轮廓。（内容待补充）', en: 'City lights tracing continents. (Content coming soon)' },
    beforeLabel: { zh: '未加工', en: 'Raw' },
    afterLabel: { zh: '已加工', en: 'Processed' },
    beforeImage: '',
    afterImage: '/featured/5.jpg',
  },
]

// ---------------------------------------------------------------------------
// Star Life — animated branching diagram
// ---------------------------------------------------------------------------

export type StarBranchNode = {
  id: string
  label: L
  desc: L
  /** mass range label */
  mass: L
  x: number
  y: number
}

export type StarBranchLink = {
  from: string
  to: string
  /** 0 = trunk, 1 = branch */
  type: number
}

export const STAR_BRANCH_NODES: StarBranchNode[] = [
  { id: 'nebula', label: { zh: '星云', en: 'Nebula' }, desc: { zh: '气体尘埃云在引力下收缩。（内容待补充）', en: 'Gas and dust collapse under gravity. (Coming soon)' }, mass: { zh: '—', en: '—' }, x: 50, y: 8 },
  { id: 'protostar', label: { zh: '原恒星', en: 'Protostar' }, desc: { zh: '收缩的气团升温发光。（内容待补充）', en: 'The collapsing clump heats up. (Coming soon)' }, mass: { zh: '—', en: '—' }, x: 50, y: 24 },
  { id: 'main-sequence', label: { zh: '主序星', en: 'Main Sequence' }, desc: { zh: '氢聚变成氦的壮年期。（内容待补充）', en: 'Hydrogen fuses to helium — stable prime. (Coming soon)' }, mass: { zh: '—', en: '—' }, x: 50, y: 42 },
  { id: 'low-branch', label: { zh: '红巨星', en: 'Red Giant' }, desc: { zh: '外层膨胀变冷。（内容待补充）', en: 'Outer layers swell and cool. (Coming soon)' }, mass: { zh: '< 8 M☉', en: '< 8 M☉' }, x: 25, y: 60 },
  { id: 'high-branch', label: { zh: '红超巨星', en: 'Red Supergiant' }, desc: { zh: '大质量恒星继续聚变。（内容待补充）', en: 'Massive stars fuse heavier elements. (Coming soon)' }, mass: { zh: '≥ 8 M☉', en: '≥ 8 M☉' }, x: 75, y: 60 },
  { id: 'planetary-nebula', label: { zh: '行星状星云', en: 'Planetary Nebula' }, desc: { zh: '外层被抛出。（内容待补充）', en: 'Outer layers are shed. (Coming soon)' }, mass: { zh: '< 8 M☉', en: '< 8 M☉' }, x: 18, y: 78 },
  { id: 'white-dwarf', label: { zh: '白矮星', en: 'White Dwarf' }, desc: { zh: '致密残骸缓慢冷却。（内容待补充）', en: 'A dense remnant slowly cools. (Coming soon)' }, mass: { zh: '< 8 M☉', en: '< 8 M☉' }, x: 18, y: 92 },
  { id: 'supernova', label: { zh: '超新星爆发', en: 'Supernova' }, desc: { zh: '剧烈爆发抛洒重元素。（内容待补充）', en: 'A violent explosion scatters heavy elements. (Coming soon)' }, mass: { zh: '≥ 8 M☉', en: '≥ 8 M☉' }, x: 82, y: 78 },
  { id: 'neutron-star', label: { zh: '中子星', en: 'Neutron Star' }, desc: { zh: '核心坍缩成极致密天体。（内容待补充）', en: 'The core collapses into an ultra-dense object. (Coming soon)' }, mass: { zh: '8–25 M☉', en: '8–25 M☉' }, x: 72, y: 92 },
  { id: 'black-hole', label: { zh: '黑洞', en: 'Black Hole' }, desc: { zh: '连光也无法逃脱。（内容待补充）', en: 'Not even light escapes. (Coming soon)' }, mass: { zh: '> 25 M☉', en: '> 25 M☉' }, x: 92, y: 92 },
]

export const STAR_BRANCH_LINKS: StarBranchLink[] = [
  { from: 'nebula', to: 'protostar', type: 0 },
  { from: 'protostar', to: 'main-sequence', type: 0 },
  { from: 'main-sequence', to: 'low-branch', type: 1 },
  { from: 'main-sequence', to: 'high-branch', type: 1 },
  { from: 'low-branch', to: 'planetary-nebula', type: 1 },
  { from: 'planetary-nebula', to: 'white-dwarf', type: 1 },
  { from: 'high-branch', to: 'supernova', type: 1 },
  { from: 'supernova', to: 'neutron-star', type: 1 },
  { from: 'supernova', to: 'black-hole', type: 1 },
]

// ---------------------------------------------------------------------------
// Tonight's Sky — stargazing guide
// ---------------------------------------------------------------------------

export type SkyEvent = {
  id: string
  title: L
  detail: L
  /** emoji icon key */
  emoji: EmojiKey
}

export type TonightData = {
  intro: L
  visiblePlanets: SkyEvent[]
  moonPhase: L
  meteorShowers: SkyEvent[]
  tips: L[]
}

export const TONIGHT_DATA: TonightData = {
  intro: {
    zh: '今晚的星空指南。以下内容为模板，后续会逐步补充具体天象信息。（内容待补充）',
    en: "Tonight's sky guide. The following is a template — specific sky events will be added over time. (Content coming soon)",
  },
  visiblePlanets: [
    { id: 'p1', title: { zh: '行星 1（待补充）', en: 'Planet 1 (TBD)' }, detail: { zh: '位置与观测时间待补充。', en: 'Position and time to be added.' }, emoji: 'saturn' },
    { id: 'p2', title: { zh: '行星 2（待补充）', en: 'Planet 2 (TBD)' }, detail: { zh: '位置与观测时间待补充。', en: 'Position and time to be added.' }, emoji: 'mars' },
  ],
  moonPhase: { zh: '月相信息待补充。', en: 'Moon phase info to be added.' },
  meteorShowers: [
    { id: 'm1', title: { zh: '流星雨（待补充）', en: 'Meteor Shower (TBD)' }, detail: { zh: '辐射点与峰值时间待补充。', en: 'Radiant and peak time to be added.' }, emoji: 'meteoroid' },
  ],
  tips: [
    { zh: '找一个远离城市灯光的地方。', en: 'Find a spot far from city lights.' },
    { zh: '给眼睛约 20 分钟适应黑暗。', en: 'Give your eyes about 20 minutes to adapt to the dark.' },
    { zh: '用红光手电筒，避免破坏夜视。', en: 'Use a red flashlight to preserve night vision.' },
  ],
}
