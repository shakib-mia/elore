/* ————————————————————————————————————————————————
   ÉLORE · content model
   All stories, services and words that fill the site.
———————————————————————————————————————————————— */

export const px = (id: number, w = 1400, h?: number) =>
	`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
		h ? `&h=${h}&fit=crop` : ""
	}`;

export const site = {
	name: "ÉLORE",
	tagline: "Visual Stories",
	photographer: "Elena Lore",
	est: "2020",
	email: "hello@elore.studio",
	phone: "+33 6 42 18 90 77",
	studio: "14 Rue des Capucins, Lyon, France",
	hours: "Tue — Sat · 9:00 — 18:00 CET",
	socials: [
		{
			label: "Instagram",
			handle: "@elore.studio",
			href: "https://instagram.com",
		},
		{
			label: "Facebook",
			handle: "/elorestudio",
			href: "https://facebook.com",
		},
		{
			label: "LinkedIn",
			handle: "/in/elena-lore",
			href: "https://linkedin.com",
		},
	],
};

/* ————— portfolio ————— */

export type Category = "Wedding" | "Portrait" | "Editorial" | "Landscape";
export const categories: ("All" | Category)[] = [
	"All",
	"Wedding",
	"Portrait",
	"Editorial",
	"Landscape",
];

export interface GalleryImage {
	src: string;
	alt: string;
	wide?: boolean;
}

export interface Project {
	slug: string;
	index: string;
	title: string;
	category: Category;
	location: string;
	year: string;
	cover: string;
	alt: string;
	layout: "large" | "small";
	camera: string;
	film: string;
	frames: string;
	story: [string, string];
	quote: string;
	gallery: GalleryImage[];
}

export const projects: Project[] = [
	{
		slug: "the-art-of-together",
		index: "01",
		title: "The Art of Together",
		category: "Wedding",
		location: "Udaipur, Rajasthan, India",
		year: "2025",
		cover: px(17657612, 1500, 1100),
		alt: "A bride and groom in golden evening light amid Tuscan hills",
		layout: "large",
		camera: "Hasselblad 500C/M",
		film: "Kodak Portra 400",
		frames: "1,240 frames · 86 kept",
		story: [
			"Olivia and James were married in a stone courtyard above the Val d'Orcia, as the last light of the day turned the hills the colour of burnt honey. Nothing about the evening was staged — the wind took the veil, the speeches ran long, and the laughter arrived exactly when it wanted to.",
			"I photographed the day the way it felt: unhurried, warm, a little wild at the edges. These are not the poses from the schedule. They are the glances between the lines of it — the hands held tighter, the grandmother watching from the doorway, the two of them alone for one stolen minute before dinner.",
		],
		quote: "The most meaningful photographs are rarely the ones you plan.",
		gallery: [
			{
				src: px(17657615, 1500, 1000),
				alt: "Elegant Indian couple in wedding attire posing in a serene rural landscape",
				wide: true,
			},
			{
				src: px(36421551, 1000, 1300),
				alt: "An elegant golden-hour wedding portrait",
			},
			{
				src: px(13887611, 1000, 1300),
				alt: "A couple walking hand in hand through warm grassland",
			},
			{
				src: px(19759573, 1500, 1000),
				alt: "Bride and groom in a meadow at sunset",
				wide: true,
			},
		],
	},
	{
		slug: "in-her-own-light",
		index: "02",
		title: "In Her Own Light",
		category: "Portrait",
		location: "Mumbai, Maharashtra, India",
		year: "2025",
		cover: px(39767268, 1100, 1400),
		alt: "A woman seated in a dark room, shaped by a single window of light",
		layout: "small",
		camera: "Leica M6",
		film: "Cinestill 800T",
		frames: "612 frames · 34 kept",
		story: [
			"Charlotte asked for portraits that did not feel like a performance. So we began with coffee, walked the eleventh arrondissement until the rain thinned, and let the apartment's one tall window do all the work. No strobes, no direction beyond 'stay with that thought'.",
			"What emerged was a study of self-possession — a woman photographed at the exact distance she chose, in light she recognised as her own. Confidence, it turns out, is not a pose. It is what remains when the performing stops.",
		],
		quote: "You don't need to know how to pose. You only need room to be yourself.",
		gallery: [
			{
				src: px(39542896, 1000, 1300),
				alt: "A contemplative portrait with dramatic shadow play",
			},
			{
				src: px(39767288, 1000, 1300),
				alt: "Close portrait in sculpted artistic light",
			},
			{
				src: px(36568558, 1500, 1000),
				alt: "A woman with a book in a rustic interior",
				wide: true,
			},
		],
	},
	{
		slug: "between-earth-and-sky",
		index: "03",
		title: "Between Earth & Sky",
		category: "Landscape",
		location: "Munnar, Kerala, India",
		year: "2024",
		cover: px(8282510, 1100, 1400),
		alt: "Scenic view of a tropical river lined with lush coconut trees under blue skies",
		layout: "small",
		camera: "Canon EOS R5",
		film: "Digital · 45MP",
		frames: "890 frames · 28 kept",
		story: [
			"Four mornings, four alarms at 4:10, and one rule: never photograph the mountain the postcard already knows. I waited for the weather to misbehave — for fog to pour over the saddles like slow water and for the sun to argue with it.",
			"The Dolomites are limestone bones wrapped in weather. On the fourth dawn the clouds finally broke in the right place, and for ninety seconds the whole range floated, unmoored, between earth and sky.",
		],
		quote: "Landscape photography is mostly patience, briefly rewarded.",
		gallery: [
			{
				src: px(36205791, 1500, 1000),
				alt: "Tranquil scene of Indian backwaters with palm trees on a sunny day.",
				wide: true,
			},
			{
				src: px(12313299, 1000, 1300),
				alt: "Serene river flanked by lush coconut trees under a bright sky, perfect for nature lovers.",
			},
			{
				src: px(20013425, 1000, 1300),
				alt: "Tranquil river with lush palm trees lining the banks in India's beautiful landscape.",
			},
		],
	},
	{
		slug: "the-quiet-elegance",
		index: "04",
		title: "The Quiet Elegance",
		category: "Editorial",
		location: "Jaipur, Rajasthan, India",
		year: "2025",
		cover: px(11624988, 1500, 1100),
		alt: "A model in satin and leather gloves, lit like an old master painting",
		layout: "large",
		camera: "Canon EOS R5",
		film: "Digital · studio",
		frames: "1,510 frames · 42 kept",
		story: [
			"A commission for an independent London label with a simple brief: 'make it feel inherited'. We built the set around a single hard key light, borrowed satin and pearls, and a rule against smiling on count three.",
			"The series moves like a held breath — gloves, collarbones, the geometry of a shoulder against darkness. Elegance here is not decoration. It is restraint, photographed at f/2 until only the essential remains in focus.",
		],
		quote: "Great editorial imagery creates a feeling before it shows a product.",
		gallery: [
			{
				src: px(11629759, 1500, 1000),
				alt: "A black-and-white studio study of a model",
				wide: true,
			},
			{
				src: px(11624991, 1000, 1300),
				alt: "A seated figure in dramatic studio light",
			},
			{
				src: px(11629755, 1000, 1300),
				alt: "A monochrome portrait in a structured jacket",
			},
		],
	},
	{
		slug: "moments-in-between",
		index: "05",
		title: "Moments in Between",
		category: "Wedding",
		location: "Udaipur, Rajasthan, India",
		year: "2024",
		cover: px(10119054, 1100, 1400),
		alt: "A couple poses in vibrant traditional clothing indoors surrounded by floral decor",
		layout: "small",
		camera: "Leica M6",
		film: "Kodak Gold 200",
		frames: "980 frames · 64 kept",
		story: [
			"Some weddings are events. This one was a weekend — a slow accumulation of swims, long tables, borrowed shirts and a ceremony that kept dissolving into conversation. I was asked to photograph 'everything that isn't the ceremony'.",
			"So this story lives in the margins: the ten minutes before guests arrive, the shoes abandoned by the lake, the two of them walking away from their own party to watch the light go. The moments in between turned out to be the whole point.",
		],
		quote: "The schedule remembers the ceremony. The photographs remember everything else.",
		gallery: [
			{
				src: px(30184689, 1500, 1000),
				alt: "A joyful couple exchanging rings during their engagement ceremony, showcasing love and happiness",
				wide: true,
			},
			{
				src: px(10119058, 1000, 1300),
				alt: "Stunning portrait of a couple in traditional attire enjoying a charming indoor wedding setting",
			},
			{
				src: px(10119059, 1000, 1300),
				alt: "Beautiful portrait of a South Asian couple in traditional attire, celebrating love",
			},
			{
				src: px(20021563, 1500, 1000),
				alt: "Charming portrait of an Indian couple during their wedding ceremony, capturing traditional elegance",
				wide: true,
			},
		],
	},

	{
		slug: "where-the-wild-things-are",
		index: "08",
		title: "Where the Wild Things Are",
		category: "Landscape",
		location: "Ladakh, India",
		year: "2023",
		cover: px(38087449, 1500, 1100),
		alt: "Sunrise breaking over an untamed mountain range",
		layout: "large",
		camera: "Canon EOS R5",
		film: "Digital · 45MP",
		frames: "1,860 frames · 37 kept",
		story: [
			"Ten days on the ring road with a rented 4x4, three batteries and a promise to stop the car every time the light changed my mind. Iceland does not perform for photographers; it simply continues, enormously, whether or not you are ready.",
			"This series is the record of being unready — fog banks that erased whole valleys in minutes, a sunrise that arrived sideways, and the humbling arithmetic of standing somewhere the earth is still visibly being made.",
		],
		quote: "Some places don't need a photographer. They allow one.",
		gallery: [
			{
				src: px(40060321, 1500, 1000),
				alt: "An aerial view of ridgelines at dusk",
				wide: true,
			},
			{
				src: px(5200951, 1000, 1300),
				alt: "Light rays over a misty highland range",
			},
			{
				src: px(23476471, 1000, 1300),
				alt: "Layered mountain silhouettes in warm haze",
			},
		],
	},
];

/* ————— services ————— */

export interface Service {
	slug: string;
	number: string;
	title: string;
	subtitle: string;
	heroTitle: string;
	price: string;
	shortDescription: string;
	description: string;
	philosophy: string;
	heroImage: string;
	previewImage: string;
	idealFor: string;
	duration: string;
	features: string[];
	gallery: GalleryImage[];
	process: { title: string; description: string }[];
	relatedProject: string; // slug
}

export const services: Service[] = [
	{
		slug: "wedding",
		number: "01",
		title: "Wedding Photography",
		subtitle: "Your day. Your people. Your story.",
		heroTitle: "The art of forever.",
		price: "from ₹2,400",
		shortDescription:
			"Your wedding day is a collection of fleeting moments, quiet emotions, and people who mean everything. Preserve the feeling of your celebration through timeless photographs.",
		description:
			"A wedding is not just a celebration. It is a collection of fleeting moments, quiet emotions, and people who mean everything. My approach combines honest storytelling with an editorial eye, preserving the feeling of your day in photographs you will return to for years to come.",
		philosophy:
			"The most meaningful photographs are rarely the ones you plan. They happen in the glance across the room, the hand held a little tighter, and the laughter that arrives when nobody is watching.",
		heroImage: px(17657612, 1800, 1100),
		previewImage: px(17657612, 700, 880),
		idealFor:
			"Couples who value genuine emotion, meaningful details, and timeless imagery.",
		duration: "Half-day or full-day coverage",
		features: [
			"Pre-wedding consultation",
			"Full-day wedding coverage",
			"Candid wedding-day photography",
			"Editorial couple portraits",
			"Professionally edited photographs",
			"Private online gallery",
			"High-resolution digital delivery",
			"Fine-art print options",
		],
		gallery: [
			{
				src: px(32495457, 1000, 1300),
				alt: "A beautiful Indian bride and groom embrace under a vibrant red veil on their wedding day",
			},
			{
				src: px(8565495, 1000, 1300),
				alt: "Beautiful Indian couple in traditional attire at their wedding ceremony in Surat, India",
			},
			{
				src: px(27876572, 1500, 1000),
				alt: "Elegant couple in traditional attire celebrating an Indian wedding outdoors",
				wide: true,
			},
		],
		process: [
			{
				title: "Getting to know you",
				description:
					"We talk about your relationship, your plans, and the moments that matter most to you.",
			},
			{
				title: "Planning your day",
				description:
					"Together, we discuss the timeline, locations, lighting, and important details.",
			},
			{
				title: "Being present",
				description:
					"You enjoy your celebration while I document the genuine moments as they unfold.",
			},
			{
				title: "Your photographs",
				description:
					"Your images are carefully selected, edited, and delivered in a private gallery.",
			},
		],
		relatedProject: "the-art-of-together",
	},
	{
		slug: "portrait",
		number: "02",
		title: "Portrait Photography",
		subtitle: "An honest expression of you.",
		heroTitle: "Your story, in focus.",
		price: "from ₹380",
		shortDescription:
			"Thoughtful portraits that celebrate individuality through natural light, meaningful composition, and an effortless photographic experience.",
		description:
			"Portrait photography is an opportunity to see yourself from a different perspective. Through natural light, thoughtful composition, and gentle direction, I create images that feel personal rather than posed — photographs that reflect who you are, not simply how you look.",
		philosophy:
			"You don't need to know how to pose or perform in front of a camera. The best portraits begin with a comfortable atmosphere, a little patience, and the freedom to be yourself.",
		heroImage: px(35834900, 1800, 1100),
		previewImage: px(35834900, 700, 880),
		idealFor:
			"Individuals, creatives, professionals, and people building a personal brand.",
		duration: "A relaxed 2-hour individual session",
		features: [
			"Personal creative consultation",
			"Location and styling guidance",
			"Guided portrait session",
			"Natural posing direction",
			"Carefully retouched photographs",
			"Private digital gallery",
			"High-resolution image delivery",
			"Optional film photography add-on",
		],
		gallery: [
			{
				src: px(7813769, 1000, 1300),
				alt: "A portrait shaped by window light",
			},
			{
				src: px(7586064, 1000, 1300),
				alt: "A close study in warm light",
			},
			{
				src: px(18477085, 1500, 1000),
				alt: "A quiet portrait with a book",
				wide: true,
			},
		],
		process: [
			{
				title: "Understanding your vision",
				description:
					"We discuss the mood, personality, and purpose you want your portraits to communicate.",
			},
			{
				title: "Finding your style",
				description:
					"We plan the location, wardrobe, lighting, and visual direction around you.",
			},
			{
				title: "The portrait session",
				description:
					"With simple guidance and a relaxed pace, we create space for natural expressions.",
			},
			{
				title: "The final selection",
				description:
					"Your strongest images are refined and delivered through a private online gallery.",
			},
		],
		relatedProject: "in-her-own-light",
	},
	{
		slug: "editorial",
		number: "03",
		title: "Editorial Photography",
		subtitle: "Imagery with a point of view.",
		heroTitle: "A vision, made visible.",
		price: "from ₹1,200 / day",
		shortDescription:
			"Distinctive visual storytelling for fashion, creative campaigns, and brands that want their imagery to communicate more than a product.",
		description:
			"Editorial photography brings ideas to life through visual storytelling. From fashion concepts to creative campaigns, every frame is shaped by composition, atmosphere, and intention. The result is imagery with a distinctive visual identity and a story worth exploring.",
		philosophy:
			"Great editorial imagery does more than show a product or a person. It creates a feeling, communicates an idea, and invites the viewer into a carefully imagined world.",
		heroImage: px(36951188, 1800, 1100),
		previewImage: px(36951188, 700, 880),
		idealFor:
			"Fashion labels, independent designers, creative campaigns, and emerging brands.",
		duration: "Planned around the creative brief",
		features: [
			"Creative consultation and briefing",
			"Concept development",
			"Moodboard and visual direction",
			"Shoot planning and coordination",
			"Editorial photography session",
			"Professional image editing",
			"High-resolution final delivery",
			"Usage licensing included",
		],
		gallery: [
			{
				src: px(9419184, 1000, 1300),
				alt: "Satin, pearls and leather in low key light",
			},
			{
				src: px(24712813, 1000, 1300),
				alt: "A fashion study in a moody studio",
			},
			{
				src: px(2863532, 1500, 1000),
				alt: "A seated editorial composition",
				wide: true,
			},
		],
		process: [
			{
				title: "The brief",
				description:
					"We define the idea, the audience, and the feeling the imagery must carry.",
			},
			{
				title: "The world-building",
				description:
					"Moodboards, casting, styling and location scouting shape a coherent visual language.",
			},
			{
				title: "The shoot",
				description:
					"A calm, precise set where every frame is made with the final story in mind.",
			},
			{
				title: "The edit",
				description:
					"A tight selection, graded and retouched, delivered ready for print and screen.",
			},
		],
		relatedProject: "the-quiet-elegance",
	},
	{
		slug: "lifestyle",
		number: "04",
		title: "Lifestyle Photography",
		subtitle: "Life, exactly as it feels.",
		heroTitle: "Life, exactly as it feels.",
		price: "from ₹520",
		shortDescription:
			"Unscripted sessions for families, couples and makers — honest photographs of your everyday, made in the places where your life actually happens.",
		description:
			"Lifestyle sessions leave the studio behind. We cook, walk, work and play — in your kitchen, your garden, your favourite stretch of coastline — while I photograph the life you already live. No matching outfits required, no smiles on command; just your ordinary days, seen with attention.",
		philosophy:
			"Years from now, you will not remember the poses. You will remember the kitchen table, the dog underfoot, the way the afternoon light fell across everyone you love.",
		heroImage: px(4307927, 1800, 1100),
		previewImage: px(4307927, 700, 880),
		idealFor:
			"Families, couples, artisans and anyone who wants their real life remembered.",
		duration: "A half-day at home or on location",
		features: [
			"Pre-session planning call",
			"Half-day documentary coverage",
			"At home or a meaningful location",
			"Gentle, minimal direction",
			"Warm, true-to-life editing",
			"Private online gallery",
			"High-resolution digital delivery",
			"Heirloom album design available",
		],
		gallery: [
			{
				src: px(4307930, 1000, 1300),
				alt: "A joyful couple sitting on a comfortable sofa indoors, sharing a moment of laughter and connection",
			},
			{
				src: px(4307958, 1000, 1300),
				alt: "Joyful couple relaxing on a cozy couch in their modern living room, enjoying quality time together",
			},
			{
				src: px(4307964, 1500, 1000),
				alt: "Cheerful couple lounging on sofa with a laptop, enjoying a relaxing day indoors",
				wide: true,
			},
		],
		process: [
			{
				title: "A conversation",
				description:
					"We talk about your people, your places, and the season of life you're in.",
			},
			{
				title: "Choosing the setting",
				description:
					"Home, a walk, a workshop — wherever your life is most itself.",
			},
			{
				title: "An unhurried session",
				description:
					"We spend real time together while I photograph it honestly.",
			},
			{
				title: "Your story, delivered",
				description:
					"A warm, coherent gallery that feels like memory, not a photoshoot.",
			},
		],
		relatedProject: "moments-in-between",
	},
];

/* ————— testimonials ————— */

export const testimonials = [
	{
		quote: "Every photograph feels like a little piece of our story. The moments, the emotions, the smallest details — everything was captured so beautifully.",
		name: "Olivia & James",
		role: "Wedding Photography",
		location: "Tuscany, Italy",
	},
	{
		quote: "The entire experience felt effortless and personal. The photographs went beyond what we imagined, capturing something genuinely special.",
		name: "Charlotte Bennett",
		role: "Portrait Photography",
		location: "Paris, France",
	},
	{
		quote: "A wonderful creative eye and an incredible attention to detail. The final images brought our campaign vision to life.",
		name: "Alexander Reed",
		role: "Editorial Photography",
		location: "London, UK",
	},
];

/* ————— shared imagery ————— */

export const imagery = {
	hero: px(13291279, 1500, 1850),
	heroAlt:
		"Golden morning light falling across a peaceful mountain landscape",
	aboutPortrait: px(37213207, 1100, 1400),
	aboutHands: px(16992812, 900, 1100),
	aboutCamera: px(29353326, 900, 700),
	contactStill: px(38511506, 1000, 1250),
};

export const stats = [
	{ value: "06", label: "Years behind the lens" },
	{ value: "120+", label: "Stories told" },
	{ value: "14", label: "Countries travelled" },
	{ value: "48k", label: "Frames kept, not taken" },
];

export const milestones = [
	{
		year: "2020",
		title: "A borrowed camera",
		text: "A grandfather's rangefinder, one roll of film, and the discovery that light could be a language.",
	},
	{
		year: "2021",
		title: "The first wedding",
		text: "Friends asked, then friends of friends. Twelve weddings in the first summer — all nerve, all heart.",
	},
	{
		year: "2023",
		title: "Iceland & the open road",
		text: "A ten-day landscape pilgrimage that reshaped how I wait, watch, and choose a frame.",
	},
	{
		year: "2024",
		title: "International recognition",
		text: "Work honoured by international wedding and portrait juries, and published in print for the first time.",
	},
	{
		year: "2026",
		title: "Stories worldwide",
		text: "From Lyon to Lake Como to Copenhagen — ÉLORE now travels wherever a story asks to be seen.",
	},
];

export const gear = [
	{ item: "Hasselblad 500C/M", note: "medium format · the slow one" },
	{ item: "Leica M6 · 35mm Summicron", note: "the quiet one" },
	{ item: "Canon EOS R5 · RF 50 f/1.2", note: "the reliable one" },
	{ item: "Kodak Portra 400 · Ilford HP5", note: "the colour of memory" },
	{ item: "One reflector, no flash kit", note: "daylight, almost always" },
];

export const faqs = [
	{
		q: "How far in advance should we book?",
		a: "Weddings are typically reserved 8–14 months ahead, especially for May through September. Portrait, editorial and lifestyle sessions can often be arranged within 3–6 weeks. If your date is close, write anyway — calendars have surprises.",
	},
	{
		q: "Do you travel for assignments?",
		a: "Gladly. Roughly half of each year's stories are made outside France. Travel within Europe is quoted simply and transparently, and worldwide commissions are always welcome.",
	},
	{
		q: "Film or digital?",
		a: "Both, chosen for the story. Weddings and portraits often mix medium-format film with digital; editorial work is usually digital for precision. You'll never need to choose — the final gallery is graded as one coherent body of work.",
	},
	{
		q: "When will we receive our photographs?",
		a: "A first preview arrives within 72 hours. Portrait and lifestyle galleries are delivered in 2–3 weeks; weddings in 6–8 weeks, because a full day deserves a careful edit, never a rushed one.",
	},
	{
		q: "Can we order prints and albums?",
		a: "Yes — and I quietly insist on it. Photographs deserve paper. Fine-art prints and hand-bound heirloom albums are made with labs in France and Italy, and designed together with you.",
	},
];

export const getProject = (slug: string) =>
	projects.find((p) => p.slug === slug);
export const getService = (slug: string) =>
	services.find((s) => s.slug === slug);
