export type StoryPage = {
  title: string
  paragraphs: string[]
}

export type StorySection = {
  id: string
  marker: string
  title: string
  pages: StoryPage[]
}

export const KUDZU_STORY: StorySection[] = [
  {
    id: 'introduction',
    marker: 'i',
    title: 'Introduction',
    pages: [
      {
        title: 'The Vine That Covered the South',
        paragraphs: [
          'Kudzu is one of the most recognizable plants in the American South. Drive through the Piedmont or along the coastal plain in summer and you will see it draped over fences, power poles, dead trees, and entire hillsides.',
          'For land managers, farmers, and foresters, it is a serious and persistent problem. This story is written for anyone who has wondered what that green blanket is, how it got here, and what can be done about it.',
        ],
      },
    ],
  },
  {
    id: 'a-plant-from-abroad',
    marker: '1',
    title: 'A Plant From Abroad',
    pages: [
      {
        title: 'Arriving From Japan',
        paragraphs: [
          'Kudzu is a climbing vine native to East Asia, including Japan, China, and Korea. People there have long used its roots for food and its fibers for cloth and paper.',
          'The plant reached North America in the 1800s and was shown at the 1876 Centennial Exposition in Philadelphia, where visitors first saw it as an ornamental curiosity.',
        ],
      },
      {
        title: 'A Gift for Erosion Control',
        paragraphs: [
          'In the early 1900s, the plant was promoted as a way to hold soil in place. Farms in the Southeast had lost huge amounts of topsoil to rain, and kudzu seemed like the perfect answer.',
          'Its fast growth and deep roots looked ideal for stabilizing gullies and slopes that were washing away.',
        ],
      },
      {
        title: 'Planted by the Thousands',
        paragraphs: [
          'During the 1930s, government agencies and conservation programs encouraged landowners to plant it. Some programs paid farmers to set out vines on eroded land.',
          'Seedlings and roots were distributed widely, and within a few decades the vine had spread far beyond the fields where it was first planted.',
        ],
      },
      {
        title: 'Why the Vine Fell Out of Favor',
        paragraphs: [
          'Once people saw how quickly kudzu grew across fields, fences, and forests, opinions changed. Farmers found that it was hard to control and that it could smother the crops and pasture they hoped to protect.',
          'By the middle of the twentieth century, it was no longer recommended for planting, and it is now considered an invasive weed across much of the South.',
        ],
      },
    ],
  },
  {
    id: 'how-to-recognize-it',
    marker: '2',
    title: 'How to Recognize It',
    pages: [
      {
        title: 'Leaves in Threes',
        paragraphs: [
          'Kudzu leaves grow in groups of three, called leaflets. Each leaflet is broad and rounded, and some are lobed, almost like a mitten.',
          'The leaves are a bright, medium green and can be large enough to cover your hand. Their size and shape are a good first clue.',
        ],
      },
      {
        title: 'Stems and Vines',
        paragraphs: [
          'The young stems are covered in fine brown hairs that feel fuzzy to the touch. Older vines become woody and can grow thick enough to wrap a tree trunk.',
          'Vines twine around whatever they touch, often climbing up poles, fences, and trees in a tight spiral.',
        ],
      },
      {
        title: 'Flowers and Seed Pods',
        paragraphs: [
          'In late summer, kudzu produces clusters of small purple flowers that smell sweet, somewhat like grapes. Bees visit them, and the scent can drift across a roadside.',
          'After the flowers fade, the plant forms flat, hairy brown seed pods that hold a few hard seeds each.',
        ],
      },
      {
        title: 'Looking-Alikes and Next Steps',
        paragraphs: [
          'Other climbing plants, such as wild grape, poison ivy, and some native vines, can look similar from a distance. Check the leaf shape, hairy stems, and flowers before deciding.',
          'If you are not sure, take clear photos of the leaves, stems, and flowers, and ask your local county extension office or a plant expert to confirm.',
        ],
      },
    ],
  },
  {
    id: 'why-it-spreads-so-fast',
    marker: '3',
    title: 'Why It Spreads So Fast',
    pages: [
      {
        title: 'A Plant Built for Summer',
        paragraphs: [
          'Kudzu grows fastest during the hot, humid months of summer. On good days in peak season, a single vine can add many inches, and sometimes more than a foot, of new growth.',
          'That rapid growth lets it outpace many native plants, which can leave it with a clear advantage over time.',
        ],
      },
      {
        title: 'Roots That Keep Going',
        paragraphs: [
          'Kudzu grows from a large, starchy root system. Over many years, these roots can grow very deep and become large enough to weigh hundreds of pounds.',
          'Cutting the top of the plant does not remove the roots, so new growth often returns the following season.',
        ],
      },
      {
        title: 'Climbing Over Everything',
        paragraphs: [
          'Kudzu climbs by wrapping its stems around anything it touches. Trees, power poles, sheds, and fences all become supports for the vine.',
          'As the leaves pile up on top of a tree, they block sunlight, and the added weight can eventually snap branches or bring the whole tree down.',
        ],
      },
      {
        title: 'Spreading Across the Landscape',
        paragraphs: [
          'Kudzu spreads in two main ways. Runners grow along the ground and root wherever they touch soil, and seeds are carried by wind, water, animals, and vehicles.',
          'Because the plant can spread in so many directions, a patch that looks small one year can cover a large area a few years later.',
        ],
      },
    ],
  },
  {
    id: 'the-cost-to-the-land',
    marker: '4',
    title: 'The Cost to the Land',
    pages: [
      {
        title: 'Smothering Forests',
        paragraphs: [
          'When kudzu covers a forest, it can block the light that young trees need to grow. Over time, the forest can become a tangle of vines with few healthy trees left.',
          'Native wildflowers, shrubs, and grasses can also disappear under the dense cover, which changes the plant community for years.',
        ],
      },
      {
        title: 'Pressure on Farms',
        paragraphs: [
          'For farmers, kudzu can take over pastures, hay fields, and fence lines. Livestock may avoid the vines, which leaves less grazing land available.',
          'Clearing kudzu from fields takes time and money, and it often has to be repeated for several years before the problem is under control.',
        ],
      },
      {
        title: 'Roadsides and Utilities',
        paragraphs: [
          'Along highways and rural roads, kudzu can hide signs, block sight lines, and cover guardrails. The added weight can also bring down power lines and utility poles.',
          'Crews that maintain roads and power lines often have to cut back the vines regularly to keep these areas safe.',
        ],
      },
      {
        title: 'Changes to the Soil',
        paragraphs: [
          'Kudzu is a legume, which means it can add nitrogen to the soil. That may sound helpful, but it can change soil chemistry in ways that favor kudzu over the plants that were there before.',
          'Once kudzu takes hold, the altered soil and the loss of native plants can make it harder for the land to recover.',
        ],
      },
    ],
  },
  {
    id: 'kudzu-in-north-carolina',
    marker: '5',
    title: 'Kudzu in North Carolina',
    pages: [
      {
        title: 'Warm, Wet Summers',
        paragraphs: [
          'North Carolina has the long, hot, humid summers that kudzu loves. That is one reason the plant is so common across the state, from the mountains to the coast.',
          'Kudzu has been reported in many North Carolina counties, and it often grows along roads, creeks, and old farm land.',
        ],
      },
      {
        title: 'The Piedmont',
        paragraphs: [
          'The rolling hills of the Piedmont are some of the places where kudzu is most visible. Its green cover can blanket hillsides and old fields, especially along highways.',
          'Many landowners in this region have spent years cutting back vines on fence lines and along pastures.',
        ],
      },
      {
        title: 'The Coastal Plain',
        paragraphs: [
          'In the flatter eastern part of the state, kudzu grows along rivers, field edges, and wooded wetlands. Wet soils do not stop it from spreading.',
          'Farms and forests here can be affected by the vine, especially where it climbs trees along the water.',
        ],
      },
      {
        title: 'Mountain Edges',
        paragraphs: [
          'Kudzu is less common high in the mountains, where winters are colder and summers are shorter. It still appears in lower valleys and along the edges of the mountain foothills.',
          'Keeping kudzu out of these cooler areas is important because they hold native plants that are slow to recover.',
        ],
      },
      {
        title: 'Where Sightings Come From',
        paragraphs: [
          'Sightings on this map come from people who have reported what they saw, along with records shared through public biodiversity databases.',
          'Each dot is a place where someone noticed kudzu. Dots show where the plant has been observed, not a verified count of every patch.',
        ],
      },
    ],
  },
  {
    id: 'fighting-back',
    marker: '6',
    title: 'Fighting Back',
    pages: [
      {
        title: 'Start Early',
        paragraphs: [
          'Kudzu is easiest to control when patches are small. Catching new growth early, before the vines reach trees and buildings, saves a lot of effort later.',
          'Walking your property in late spring and summer can help you spot new patches before they spread.',
        ],
      },
      {
        title: 'Cutting and Treating',
        paragraphs: [
          'Cutting the vines alone rarely kills the plant. Many land managers cut the vine and then apply an herbicide directly to the fresh stump, which helps reach the roots.',
          'Always read and follow the label on any herbicide, and check with your state or county extension office for the right product and timing.',
        ],
      },
      {
        title: 'Repeated Mowing and Grazing',
        paragraphs: [
          'Mowing kudzu again and again weakens it over time, because the plant has to keep rebuilding its leaves from stored energy in the roots.',
          'Some farmers use goats or sheep to graze kudzu, which can help keep patches down, though grazing alone is usually slow to eradicate it.',
        ],
      },
      {
        title: 'Herbicide Basics',
        paragraphs: [
          'Some herbicides are sprayed on the leaves in late summer, when the plant is moving energy down into its roots. Timing matters, and the best window depends on your region.',
          'Be careful around water, desirable plants, and neighboring property, and wear protective gear as the label recommends.',
        ],
      },
      {
        title: 'Working With Neighbors',
        paragraphs: [
          'Kudzu does not respect property lines. A patch on one lot can spread into the next, so working with neighbors often makes a bigger difference than acting alone.',
          'Local extension offices, soil and water conservation districts, and community groups can share advice and sometimes help coordinate efforts.',
        ],
      },
    ],
  },
  {
    id: 'conclusion',
    marker: '7',
    title: 'Conclusion',
    pages: [
      {
        title: 'Learning to Look',
        paragraphs: [
          'Once you learn to recognize kudzu, you start to see it everywhere. Its leaves, stems, and flowers become familiar signs of where it has taken hold.',
          'Use the pictures and the identification steps in this app to help you tell kudzu from look-alike plants.',
        ],
      },
      {
        title: 'Reporting What You See',
        paragraphs: [
          'Reporting a sighting helps other people understand where kudzu is growing and where it may be spreading next.',
          'Add a clear location, a short note about the patch, and a photo if you can, so others can find it and judge its size.',
        ],
      },
      {
        title: 'Protecting Your Land',
        paragraphs: [
          'If kudzu is on your land, start with small, steady steps. Clear the smallest patches first and keep watch for new growth.',
          'Enlist help from experts whenever you have doubts about what to use or how to use it safely.',
        ],
      },
      {
        title: 'A Long Fight',
        paragraphs: [
          'Kudzu is hard to beat, and there is no quick fix. Control usually takes several seasons of consistent work, and some patches never fully disappear.',
          'Even so, many landowners have brought kudzu under control on parts of their property, and that progress matters.',
        ],
      },
      {
        title: 'Thank You',
        paragraphs: [
          'Thank you for learning about kudzu and for helping others see where it grows. Every sighting and every cleared patch makes a difference.',
          'Whether you are a farmer, a neighbor, or a curious traveler, your attention helps keep the South a little greener in the right places.',
        ],
      },
    ],
  },
]
