import Blog from './models/Blog'

export async function seedBlogs() {
  await Blog.updateOne(
    { slug: 'badrinath-temple', images: 'https://images.unsplash.com/photo-1622325370390-349f257a3e7e?auto=format&fit=crop&w=1200&q=80' },
    { $set: { 'images.0': 'https://images.unsplash.com/photo-1615966650071-855b15f29ad1?auto=format&fit=crop&w=1200&q=80' } }
  )

  const count = await Blog.countDocuments()
  if (count > 0) return

  const blogs = [
    {
      title: "Kedarnath Temple: A Divine Pilgrimage in the Himalayas",
      slug: "kedarnath-temple",
      summary: "A complete travel and spiritual guide to Kedarnath Temple, including its ancient origins, trek routes, and essential tips for pilgrims.",
      introduction: "Kedarnath Temple is one of the most sacred Hindu shrines in the world, dedicated to Lord Shiva. Situated at an altitude of 3,583 meters (11,755 feet) in the Rudraprayag district of Uttarakhand, it is a prominent part of the Chota Char Dham pilgrimage. Flanked by snow-capped peaks and the Mandakini River, the temple attracts millions of devotees each year who undertake a challenging trek to seek spiritual solace.",
      sections: [
        {
          heading: "History & Legend",
          body: "The origin of Kedarnath Temple is deeply connected with the Hindu epic Mahabharata. Following the Kurukshetra war, the Pandava brothers sought forgiveness from Lord Shiva for the killings of their kin. Shiva, wishing to avoid them, disguised himself as a bull and took refuge in the Garhwal Himalayas. When the Pandavas spotted him, Shiva dived into the ground, leaving his hump on the surface. The hump remains at Kedarnath, while other parts of his body emerged at four other locations, collectively worshipped as the Panch Kedar. The present temple structure was reconstructed by the great philosopher Adi Shankara in the 8th century AD."
        },
        {
          heading: "How to Reach",
          body: "The journey to Kedarnath begins from Haridwar, Rishikesh, or Dehradun. The motorable road goes up to Sonprayag and Gaurikund. From Gaurikund, a steep 16 km trek leads to the temple. Travelers can choose to trek on foot, hire a pony/palanquin (dandi/kandi), or take a helicopter service. Heliports operate from Phata, Sersi, and Guptkashi, but tickets must be booked in advance via the official IRCTC portal."
        },
        {
          heading: "Best Time to Visit",
          body: "Due to severe winter weather and heavy snowfall, the temple is closed from November to April. The ideal time to visit is during the summer months from May to June and autumn months from September to October. Monsoon months (July and August) should be avoided due to the high risk of landslides and cloudbursts along the route."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Rudraprayag" },
        { key: "Deity", value: "Lord Shiva (Kedarnath)" },
        { key: "Elevation", value: "3,583 m (11,755 ft)" },
        { key: "Trek Distance", value: "16 km from Gaurikund" },
        { key: "Nearest Airport", value: "Jolly Grant Dehradun (239 km)" },
        { key: "Nearest Railway", value: "Rishikesh (216 km)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Pilgrimage", "Garhwal", "Char Dham"],
      isActive: true,
      order: 1
    },
    {
      title: "Badrinath Temple: The Sacred Abode of Lord Vishnu",
      slug: "badrinath-temple",
      summary: "Explore Badrinath Temple, the legendary shrine of Lord Vishnu nested between the Nar and Narayana mountain ranges.",
      introduction: "Badrinath Temple, situated in the Chamoli district of Uttarakhand along the banks of the Alaknanda River, is one of the most revered pilgrimage sites in India. It is the only shrine that is part of both the national Char Dham circuit and the Chota Char Dham of Uttarakhand. Dedicated to Lord Vishnu, the temple stands at an elevation of 3,133 meters (10,279 feet) against the backdrop of the majestic Neelkanth Peak.",
      sections: [
        {
          heading: "Mythology & Architecture",
          body: "According to legend, Lord Vishnu sat in deep meditation at this spot. To protect him from the harsh weather, his consort Goddess Lakshmi took the form of a Badri (jujube) tree to shade him. Touched by her devotion, Vishnu named the spot Badrinath (Lord of the Badri Forest). The temple has a distinctive, colorful facade resembling a Buddhist monastery, suggesting historical transformations. The inner sanctum features a self-manifested (Swayambhu) 1-meter-tall black stone statue of Lord Vishnu in a meditative posture."
        },
        {
          heading: "Key Attractions",
          body: "Aside from the main temple, pilgrims visit Tapt Kund, a natural hot sulphur spring just below the temple where devotees take a holy dip before entering. Mana Village, located 3 km away, is the last Indian village before the border with Tibet/China and features Vyas Gufa, where Sage Vyas is said to have composed the Mahabharata."
        },
        {
          heading: "How to Reach",
          body: "Unlike Kedarnath, Badrinath is fully accessible by motorable roads. The journey takes visitors along national highways via Rishikesh, Devprayag, Rudraprayag, and Joshimath. The road trip offers stunning views of the Alaknanda River and the confluences (Panch Prayag)."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Chamoli" },
        { key: "Deity", value: "Lord Vishnu (Badrinarayan)" },
        { key: "Elevation", value: "3,133 m (10,279 ft)" },
        { key: "Access", value: "Directly by Road" },
        { key: "Hot Spring", value: "Tapt Kund" },
        { key: "Nearest Airport", value: "Jolly Grant Dehradun (311 km)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Pilgrimage", "Garhwal", "Char Dham"],
      isActive: true,
      order: 2
    },
    {
      title: "Valley of Flowers: A Trek into Nature's Paradise",
      slug: "valley-of-flowers",
      summary: "Plan your trek to the UNESCO World Heritage site Valley of Flowers, showcasing thousands of alpine flowers in full bloom.",
      introduction: "The Valley of Flowers National Park is a UNESCO World Heritage Site located in the Chamoli district of Uttarakhand. Nestled in the Western Himalayas, this high-altitude valley is renowned for its meadows of endemic alpine flowers and outstanding natural beauty. Spanning over 87 square kilometers, the valley is home to rare animals including the Asiatic black bear, snow leopard, brown bear, and blue sheep.",
      sections: [
        {
          heading: "Discovery and Fame",
          body: "Although locals knew of the valley, it was introduced to the world in 1931 by British mountaineers Frank S. Smythe, Eric Shipton, and R.L. Holdsworth, who lost their way returning from Kamet and stumbled upon the flower-filled meadows. Entranced by the sight, Smythe wrote the book 'The Valley of Flowers', immortalizing its beauty."
        },
        {
          heading: "Trek Route",
          body: "The trek starts from Govindghat (near Joshimath). Devotees and hikers trek 13 km to the base camp at Ghangaria. From Ghangaria, the trail splits: one leads to the sacred Hemkund Sahib Gurudwara (6 km climb), and the other enters the Valley of Flowers (approx 4 km flat trek). The valley has no accommodation, so visitors must return to Ghangaria by afternoon."
        },
        {
          heading: "Blooming Season",
          body: "The valley is open only from June 1st to October 31st. The best time to see the flowers in full bloom is between July and August, right after the first monsoon rains when hundreds of species, including the rare Blue Poppy, Brahmakamal, and Cobra Lily, paint the valley in vibrant colors."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Chamoli" },
        { key: "Status", value: "UNESCO World Heritage Site" },
        { key: "Elevation", value: "3,658 m (12,001 ft)" },
        { key: "Trek Distance", value: "17 km total from Govindghat" },
        { key: "Best Time", value: "July to August (Monsoon)" },
        { key: "Open Dates", value: "June 1 - October 31" }
      ],
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Trekking", "Adventure", "Nature"],
      isActive: true,
      order: 3
    },
    {
      title: "Auli: The Skiing and Adventure Capital of India",
      slug: "auli-skiing",
      summary: "Explore the scenic ski slopes, ropeway rides, and majestic Himalayan views of Auli, Uttarakhand.",
      introduction: "Auli is a premier ski destination located in the Chamoli district of Uttarakhand. Surrounded by coniferous and oak forests, Auli offers panoramic views of some of the highest peaks of the Indian Himalayas, including Nanda Devi, Kamet, and Mana Parvat. Located at an elevation of 2,505 meters to 3,050 meters, it is a hub for winter sports and summer trekking alike.",
      sections: [
        {
          heading: "Winter Sports & Skiing",
          body: "During winter (December to February), Auli turns into a snowy wonderland. The slopes are equipped with ski lifts and chairlifts, and are ideal for both beginners and professional skiers. National skiing championships are held here, and the Garhwal Mandal Vikas Nigam (GMVN) offers professional ski training programs."
        },
        {
          heading: "Major Attractions",
          body: "Auli features one of the longest cable car routes in Asia, stretching 4 km from Joshimath to Auli, offering breathtaking aerial views. The Auli Artificial Lake is one of the world's highest man-made lakes, built to feed snow guns for the ski slopes. A popular summer trek leads to Gorson Bugyal, a massive meadow with views of Nanda Devi."
        },
        {
          heading: "How to Travel",
          body: "Auli is reached via Joshimath, which is well-connected by road from Haridwar and Rishikesh. From Joshimath, visitors can either drive 16 km up the mountain road or take the scenic ropeway."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Chamoli" },
        { key: "Famous For", value: "Skiing & Snowboarding" },
        { key: "Elevation", value: "2,800 m (9,186 ft)" },
        { key: "Ropeway", value: "4 km from Joshimath" },
        { key: "Key Peak Visible", value: "Nanda Devi (7,816 m)" },
        { key: "Best Time", value: "Dec to Feb (Snow), Apr to Jun (Meadows)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Hill Station", "Adventure", "Garhwal"],
      isActive: true,
      order: 4
    },
    {
      title: "Rishikesh: Yoga, Rafting, and Spiritual Awakenings",
      slug: "rishikesh-guide",
      summary: "Discover Rishikesh: the world capital of Yoga, the ultimate white-water rafting hub, and the gateway to the Garhwal Himalayas.",
      introduction: "Rishikesh is a legendary city located in the foothills of the Himalayas where the Ganges River flows down into the plains. Known globally as the 'Yoga Capital of the World', it is a center for spiritual study, meditation, and ancient philosophy. Concurrently, it has earned the title of India's adventure sports hub, drawing travelers for rafting, bungee jumping, and camping.",
      sections: [
        {
          heading: "The Yoga Capital",
          body: "Rishikesh is lined with ashrams offering traditional Hatha, Ashtanga, and Kundalini yoga. In 1968, the Beatles visited Maharishi Mahesh Yogi's ashram (now a popular tourist site known as the Beatles Ashram), sparking a massive wave of Western interest in Indian spirituality and meditation."
        },
        {
          heading: "Adventure Sports",
          body: "The stretch of Ganges from Kaudiyala and Shivpuri to Rishikesh features rapids ranging from Grade I to Grade IV, making it the most popular white-water rafting destination in India. Additionally, Mohan Chatti hosts India's highest fixed-platform bungee jump (83 meters)."
        },
        {
          heading: "Cultural and Spiritual Sites",
          body: "The iconic suspension bridges, Ram Jhula and Lakshman Jhula, span the Ganges and connect major temples and markets. Every evening, visitors gather at Triveni Ghat or Parmarth Niketan Ashram to witness the Ganga Aarti, a spiritual ritual of light and chants."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Dehradun / Pauri Garhwal" },
        { key: "Nickname", value: "Yoga Capital of the World" },
        { key: "River", value: "Ganges (Ganga)" },
        { key: "Key Attractions", value: "Ram Jhula, Ganga Aarti, Ashrams" },
        { key: "Adventure", value: "River Rafting, Bungee Jumping" },
        { key: "Nearest Airport", value: "Jolly Grant Dehradun (21 km)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Spiritual", "Adventure", "Yoga"],
      isActive: true,
      order: 5
    },
    {
      title: "Mussoorie: A Weekend Getaway to the Queen of Hills",
      slug: "mussoorie-guide",
      summary: "A curated itinerary for Mussoorie, including Kempty Falls, Lal Tibba, Mall Road, and nearby scenic views.",
      introduction: "Mussoorie is a famous hill station in the Dehradun district of Uttarakhand. Situated in the foothills of the Garhwal Himalayan range, it is popularly known as the 'Queen of the Hills'. With its pleasant climate, colonial architecture, and cascading waterfalls, Mussoorie has been a favorite escape for travelers since the British era.",
      sections: [
        {
          heading: "Colonial History and Mall Road",
          body: "Established in the 1820s by Lieutenant Frederick Young and Mr. Shore, Mussoorie quickly became a popular summer resort. The heart of Mussoorie is Mall Road, a bustling avenue lined with colonial-style buildings, restaurants, and shops. Gun Hill, accessible by cable car from Mall Road, offers panoramic views of the Doon Valley and Himalayan ranges."
        },
        {
          heading: "Natural Wonders & Scenic Spots",
          body: "Kempty Falls is a giant waterfall where visitors can enjoy a bath in the cold waters. Lal Tibba is the highest point in Mussoorie, located in Landour, and offers telescope views of snow peaks. Landour itself is a quiet cantonment town known for its peaceful pine forests and connection to famous author Ruskin Bond."
        },
        {
          heading: "Cloud's End & George Everest",
          body: "Cloud's End marks the geographical end of Mussoorie, surrounded by thick forests of oak and deodar. Sir George Everest's House is the historic estate of the surveyor after whom Mount Everest was named, offering gorgeous sunset views over the valley."
        }
      ],
      infobox: [
        { key: "State", value: "Uttarakhand" },
        { key: "District", value: "Dehradun" },
        { key: "Elevation", value: "2,005 m (6,578 ft)" },
        { key: "Key Attractions", value: "Mall Road, Kempty Falls, Landour" },
        { key: "Established", value: "1823" },
        { key: "Best Time", value: "March to June, Oct to Nov" },
        { key: "Distance from Dehradun", value: "35 km" }
      ],
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
      ],
      categories: ["Hill Station", "Garhwal", "Weekend Getaway"],
      isActive: true,
      order: 6
    }
  ]

  await Blog.insertMany(blogs)
}
