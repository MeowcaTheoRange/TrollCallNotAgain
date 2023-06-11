import * as yup from "yup";
import { ColorSchema, ColorTypes } from "./color";

export enum ClassGender {
  Male,
  Unisex,
  Female,
}

export enum ClassDisposition {
  Active,
  Passive,
}

export const ClassShelfSchema = yup.object({
  name: yup.string().required(),
  pair: yup.string().required(),
  keyword: yup.string().required(),
});

export type ClassShelfType = {
  name: string;
  pair: string;
  keyword: string;
};

export const ClassShelf: { [key: string]: ClassShelfType } = {
  Magician: {
    name: "Magician",
    pair: "Prophet",
    keyword: "Manipulate",
  },
  Prophet: {
    name: "Prophet",
    pair: "Magician",
    keyword: "Understand",
  },
  Destroyer: {
    name: "Destroyer",
    pair: "Healer",
    keyword: "Destroy", // fucking duh
  },
  Healer: {
    name: "Healer",
    pair: "Destroyer",
    keyword: "Create",
  },
  Stealer: {
    name: "Stealer",
    pair: "Warrior",
    keyword: "Redistribute",
  },
  Warrior: {
    name: "Warrior",
    pair: "Stealer",
    keyword: "Apply",
  },
};

export const ClassSchema = yup.object({
  name: yup.string().required(),
  gender: yup.string().required(),
  disposition: yup.string().required(),
  pair: yup.string().required(),
  inverse: yup.string().required(),
  keyword: yup.string().required(),
  shelf: ClassShelfSchema.required(),
});

export type ClassType = {
  name: string;
  gender: string; // just for "canon check"; this is not actually enforced
  disposition: string;
  pair: string;
  inverse: string;
  keyword: string;
  shelf: ClassShelfType;
};

export const Class: { [key: string]: ClassType } = {
  Witch: {
    name: "Witch",
    gender: "Female",
    disposition: "Active",
    keyword: "Control",
    pair: "Heir",
    inverse: "Seer",
    shelf: ClassShelf.Magician,
  },
  Heir: {
    name: "Heir",
    gender: "Male",
    disposition: "Passive",
    keyword: "Influence",
    pair: "Witch",
    inverse: "Mage",
    shelf: ClassShelf.Magician,
  },
  Mage: {
    name: "Mage",
    gender: "Unisex",
    disposition: "Active",
    keyword: "Experience",
    pair: "Seer",
    inverse: "Heir",
    shelf: ClassShelf.Prophet,
  },
  Seer: {
    name: "Seer",
    gender: "Unisex",
    disposition: "Passive",
    keyword: "Study",
    pair: "Mage",
    inverse: "Witch",
    shelf: ClassShelf.Prophet,
  },
  Prince: {
    name: "Prince",
    gender: "Male",
    disposition: "Active",
    keyword: "Demolish",
    pair: "Bard",
    inverse: "Sylph",
    shelf: ClassShelf.Destroyer,
  },
  Bard: {
    name: "Bard",
    gender: "Male",
    disposition: "Passive",
    keyword: "Deconstruct",
    pair: "Prince",
    inverse: "Maid",
    shelf: ClassShelf.Destroyer,
  },
  Maid: {
    name: "Maid",
    gender: "Female",
    disposition: "Active",
    keyword: "Generate",
    pair: "Sylph",
    inverse: "Bard",
    shelf: ClassShelf.Healer,
  },
  Sylph: {
    name: "Sylph",
    gender: "Female",
    disposition: "Passive",
    keyword: "Mend",
    pair: "Maid",
    inverse: "Prince",
    shelf: ClassShelf.Healer,
  },
  Thief: {
    name: "Thief",
    gender: "Unisex",
    disposition: "Active",
    keyword: "Take",
    pair: "Rogue",
    inverse: "Page",
    shelf: ClassShelf.Stealer,
  },
  Rogue: {
    name: "Rogue",
    gender: "Unisex",
    disposition: "Passive",
    keyword: "Share",
    pair: "Thief",
    inverse: "Knight",
    shelf: ClassShelf.Stealer,
  },
  Knight: {
    name: "Knight",
    gender: "Unisex",
    disposition: "Active",
    keyword: "Exploit",
    pair: "Page",
    inverse: "Rogue",
    shelf: ClassShelf.Warrior,
  },
  Page: {
    name: "Page",
    gender: "Unisex",
    disposition: "Passive",
    keyword: "Empower",
    pair: "Knight",
    inverse: "Thief",
    shelf: ClassShelf.Warrior,
  },
  Lord: {
    name: "Lord",
    gender: "Male",
    disposition: "Active",
    keyword: "Dominate",
    pair: "Muse",
    inverse: "Muse",
    shelf: ClassShelf.Master,
  },
  Muse: {
    name: "Muse",
    gender: "Female",
    disposition: "Passive",
    keyword: "Inspire",
    pair: "Lord",
    inverse: "Lord",
    shelf: ClassShelf.Master,
  },
};

export const ClassList = Object.values(Class);
export const ClassNameList = Object.keys(Class);

export const SwaySchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

export type SwayType = {
  name: string;
  description: string;
};

export const Sway: { [key: string]: SwayType } = {
  Prospit: {
    name: "Prospit",
    description:
      "Marked by a flexible optimism, the personalities of Prospit Dreamers are reactive and intuitive. They naturally exist in the present, rather than look to the future or obsess over the past. When making decisions Prospit Dreamers tend to rely on gut instinct and whatever emotions they are experiencing at the moment. This makes them quick to act and reliable in a crisis, but it also can make them capricious. They have trouble thinking things through, and their feelings toward specific situations and decisions can change from day to day. They solve problems with creativity rather than cold logic, often seeing multiple options with ease and clarity. Because they generally take things as they come, Prospit Dreamers are less rebellious than they are adaptable-instead of struggling against authority, they will find a way to coexist with it. Possibly because they are so instinctual and flexible, they like having a defined set of rules-a safety net for their passionate lives. Naturally trusting, they have trouble with deception or hiding their true selves, and will often worry about what others think of them. The self they project into the world is often not under their control.",
  },
  Derse: {
    name: "Derse",
    description:
      "Derse Dreamers have personalities marked by a distinct and restless skepticism. Whatever their waking circumstances, chances are they will live in a state of dissatisfaction. Rebellion is in their blood, manifesting whether they are fighting back against a fascist dictatorship, or the most recent trend in casual footwear. Derse Dreamers are cerebral and self-aware; they have a far better grasp on the landscape of their own minds than on the world around them, which they can find alienating and confusing. But as so much of their identity is built on control, they will do their utmost to hide any insecurities, often with false humility or self-deprecating humor. They may be inflexible and pessimistic, but they are also great problem solvers, facing conflicts head-on with shrewd, calculating minds. They see one true path among an infinite snarl of wrong ones. They tend to be introverted, but if you win their trust Derse Dreamers are extremely powerful allies. However, they find sincere vulnerability difficult and will often keep people at arm's length. Letting go and living in the moment is hard for a Derse Dreamer; they constantly look toward the future and analyze the past.",
  },
};

export const SwayList = Object.values(Sway);

export const AspectSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

export type AspectType = {
  name: string;
  description: string;
};

export const Aspect: { [key: string]: AspectType } = {
  Time: {
    name: "Time",
    description:
      "Those bound to the aspect of Time are fighters, full stop. Their lives are often marked by struggle, not so much because fate has it in for them, but because they are fundamentally incapable of just accepting things as they come. They value action over passive acceptance, even if that may not be the wisest or safest choice. Don't try to tell a Time-bound to sit still and look pretty. They are very goal-focused, and tend to value the destination over the journey, and you won't find them making that journey in any traditional sort of way. To quote cheesy posters found on many a guidance counselor's wall-\"impossible is just a word\". If you need a miracle, they are who you call. At their best, the Time-bound are empathetic and relentless problem-solvers. At their worst they are ruthless, defensive, and impulsive. ",
  },
  Space: {
    name: "Space",
    description:
      "Those bound to the aspect of Space are, as the name suggests, concerned with the big picture. They are patient, masters of the art of 'wait-and-see', and are inclined to take things as they come. That isn't to say that they're pushovers or willing to let injustice lie-they just choose their battles wisely, understanding that sometimes you have to let something burn to the ground in order to build it back better and stronger than before. To this effect, they tend to be innovators, concerned with creation and redemption. Catch them recycling the old to make the new, the fresh, and the beautiful. For the Space-bound, the journey is as, if not more, important than the destination; how they do something is as important as what they do. At their best, they are steady, impartial, and creative. At their worst, they can be detached, apathetic, and vague. ",
  },
  Heart: {
    name: "Heart",
    description:
      "Those bound to the aspect of Heart are very concerned with their favorite subject: themselves. It wouldn't be a stretch to call them 'self-obsessed', but not necessarily in a negative way. They simply want to understand the one thing we all are stuck with for our entire lives, i.e. our own minds. Forging an identity is extremely important to the Heart-bound, and every decision and action goes toward building a coherent narrative of their own story. That isn't to say Heart-bound don't care deeply for their friends and allies; they just have a tendency to assume that everyone is as concerned with identity as they are. They are excellent at putting on and taking off masks as the situation calls for them. At their best, they are competent, imaginative, and steady. At their worst they can be overbearing, inflexible, and cold. ",
  },
  Mind: {
    name: "Mind",
    description:
      "Those bound to the aspect of Mind are-you guessed it-the universe's great thinkers. But don't for a second think that means that they have all the answers. They are very concerned with remaining rational, and they have such a firm hold on the constant conjunction of their thinking that it's easy for them to see the multitudes of the choices laid out before them, which often leaves them frozen and unable to act. That said, when a Mind-bound finally launches into action, they can execute a plan with unbelievable grace and precision. Their identity is fluid-it can change from day-to-day, from thought-to-thought, from interaction-to-interaction. Remaining logical is more important to them than building up a solid foundation of \"self.\" At their best they are great innovators, architects, and creators.  At their worst they can be nasty, inflexible, and indecisive. ",
  },
  Hope: {
    name: "Hope",
    description:
      "Those bound to the aspect of Hope are driven first and foremost by their convictions. They do right for right's sake, and are quick to come to the aid of anyone they deem to be experiencing injustice. That said, their views of the world can be quite black and white, so what they see as the \"right\" thing may not always be the universally accepted view. They put great value in the power of the imagination, the ability to dream up a better and more beautiful future. If anyone could dream a better world into existence, it would be one of the Hope-bound. They may sound like all sunshine and rainbows, but they aren't adverse to a little destruction, especially if they think they can replace it with something better and more just. At their best, Hope-bound are positive, caring, and warm. At their worst they can be narrow-minded and selfish. ",
  },
  Rage: {
    name: "Rage",
    description:
      "Those bound to the aspect of Rage are bringers of chaos. They posses great contempt for lies or false ideas, including the stability that false ideas can impart. To them, the true is far more important than the good; they would tear down a system just to destabilize it if, by their reckoning, it is built on faulty premises. Often the Rage-bound prefer anarchy to any of the alternate forms of civilization, which they believe to be riddled with lies and foolishness and obedient masses. They are bringers of confusion and doubt, and they can be frustratingly difficult to convince otherwise when they have attached themselves to an idea. If they sound dangerous, they are. The Rage-bound tend to be most volatile and unpredictable of the aspects. At their best they are original, revolutionary, and fearless. At their worst they are cruel, uncompromising, and vicious. ",
  },
  Light: {
    name: "Light",
    description:
      "Those bound to the aspect of Light are the universe's knowledge-seekers. They are, above all, driven to learn and understand. They are great alchemists, able to take multiple sources of information and synthesize them into something useful. They are scholars and researchers, absolutely dedicated to knowledge for knowledge's sake. They are the ultimate students, and although that might conjure up the image of people sitting around peacefully waiting for knowledge to be brought to them, that couldn't be further from the truth. The Light-bound will go after knowledge with a fierce intensity that others may find distasteful. They aren't overly concerned with laws or norms, either. They often take rules as simple suggestions, instead searching for loopholes or work-arounds. At their best, the Light-bound are resourceful and driven. At their worst they can be fussy, pedantic, and insensitive.",
  },
  Void: {
    name: "Void",
    description:
      "Those bound to the aspect of Void are the universe's secret-keepers. The unknown doesn't scare them-where others might see emptiness, they see potential. A blank page, an empty canvas, that's what the Void-bound live for. They value mystery and the unexplained, and are not particularly bothered by not having all the answers. Where others might be compelled to go out and seek answers, the Void-bound lean more toward casting doubt on what is already considered fully understood. They don't take much on faith and would rather live in a state of confusion than believe something that might be untrue or bow to intellectual authority. After all, in order for something new to be built, the old, rotting foundation must often be razed. At their best, Void-bound are wise, intuitive, and vibrant. At their worst they can be dismissive, indecisive, and apathetic. ",
  },
  Breath: {
    name: "Breath",
    description:
      "Those bound to the aspect of Breath are, above all, expansive. Flexible and driven, they leave an impact wherever they go. Like the breeze itself, they are able to sweep others up to carry along in their wake, but also like the breeze, they can be difficult to catch hold of or tie down. Although Breath-bound do make very good leaders, breath tends to be a very personal aspect. Often, heroism comes along as an offshoot of them pursuing their own personal stories. They lead by example, and will routinely be surprised that others look up to or feel inspired by them. They have a tendency to underestimate themselves, and not always out of poor self-esteem. They were just doing their own thing. At their best Breath-bound are motivated, adaptable, and forward thinking, but at their worst they can be volatile, avoidant, and gullible.",
  },
  Blood: {
    name: "Blood",
    description:
      'Those bound to the aspect of Blood draw their strength from bonds, from the trust and camaraderie that blooms among a group of people who all share a single vision. Blood-bound are absolutely leaders, but they inhabit more of an inspirational role than a commanding one. They are prophets, rather than generals, giving others the strength and motivation to keep fighting. The Blood-bound can dispense excellent advice even when their own lives and interpersonal relationships are disasters. They can be very "do as I say, not as I do" types. A Blood-bound can often be found on a sinking ship, forcing an endeavor forward with sheer stubborn force of will. No matter how bad things go, a Blood-bound can always count on friends and allies. At their best, they are charismatic, uplifting, and magnetic. At their worst they can be sullen, unkind, and set-in-their-ways. ',
  },
  Life: {
    name: "Life",
    description:
      "Those bound to the aspect of Life are the universe's healers. They are concerned with the betterment of themselves and those around them, as well as the onward march of positive progress. Deeply empathetic, they have an intuitive understanding of other's suffering and the best way of righting those wrongs. If you're poisoned, chances are the Life-bound have something for what ails ya. This applies to both physical and mental suffering, though it might not be a cure you'll like. They also have the tendency to put other's needs before their own, which never ends well for anyone, because the Life-bound can grow bitter if they feel their own self-care has had to be shunted aside. At their best, they are great listeners, caretakers, and nurturers. At their worst, the Life-bound are passive aggressive, and pushy-they're certain they know best. ",
  },
  Doom: {
    name: "Doom",
    description:
      "Those bound to the aspect of Doom are fate's chosen sufferers. It may not sound like an overly pleasant aspect to be aligned with, but it does come along with great wisdom and empathy. The Doom-bound understand that misery loves company, and they are ready and willing to provide said company. The Doom-bound won't fix you; they aren't healers. They are commiserators, aware that sometimes the only thing you can do for a person is let them know that they are not alone in their suffering. They are not the advice friend-they're the friend you go to when you need to vent about a rough day at work. They are not necessarily noble martyrs, either-the Doom-bound can become quite irate about their lot. At their best they are wise, kind, and non-judgemental. At their worst, bitter, resentful, and fatalistic.",
  },
};

export const AspectList = Object.values(Aspect);

export const SignColorSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  sign: yup.string().required(),
  color: ColorSchema.required(),
  dates: yup
    .tuple([yup.string().required(), yup.string().required()])
    .required(),
});

export type SignColorType = {
  name: string;
  description: string;
  sign: string;
  color: ColorTypes;
  dates: [string, string];
};

export const SignColor: {
  [key: string]: SignColorType;
} = {
  Rust: {
    name: "Rust",
    description:
      "Adventure motivates Rust Signs more than anything else. They crave new experiences, the wilder and farther-from-home, the better. They are confident and energetic, ready to face the unknown. This dynamism makes them great leaders, but it can also make them foolhardy. Often, they don't posses the level of caution they should for someone so willing to jump into new things. Their willingness to trust can get them into trouble, but they are also incredibly resilient. Their ability to bounce back from trauma and injury leaves them as the toughest sign class on the spectrum. Rust Signs make great friends and traveling companions, but they also can be selfish and quick to anger. If what they deem to be an acceptable level of \"excitement\" isn't happening around them, they have a tendency to try to stir some up. They love the drama. They have incredibly high expectations for themselves and for romantic partners. If someone doesn't live up to these, they may deem them not worth their time. If they aren't careful, Rust Signs can end up in a cycle of excitement, followed by crushed expectations, followed by a quick recovery and new flush of excitement. ",
    sign: "Aries",
    color: [255, 0, 0],
    dates: ["March 21", "April 19"],
  },
  Bronze: {
    name: "Bronze",
    description:
      "Bronze Signs have a warm and generous disposition, but you might not accuse them of it the first time you meet. They have a tendency toward being withdrawn and slow to open up with new people. This can make them come off as arrogant and cold, like they think they are too good for everyone, although the reality couldn't be further from the truth. In fact, they crave validation and companionship. They are very open-hearted, but if a Bronze Sign decides to dig their heels in, it can be like talking to a wall. More so than any of the other sign classes, Bronze Signs have a marked love of creature comforts. They crave stability and safety, and if they have the means, their homes will be full of beautiful things. Some might accuse them of being hedonistic; they would probably just claim to know what they like. As lovers they can be quite needy, wanting assurances that the affection they feel is reciprocated. Maybe because of this, they have a particular affinity for animals. Don't try to break a Bronze's Sign's routines-they'll resent you for it, even if oftentimes they are too polite to say so.",
    sign: "Taurus",
    color: [255, 128, 0],
    dates: ["April 20", "May 20"],
  },
  Gold: {
    name: "Gold",
    description:
      "Gold Signs are the reigning geniuses of the sign class spectrum, and chances are they know it. Witty and widely read, they enjoy conversation and debate, even when that conversation gets a little one-sided. They can come off as preachy, and they have a tendency to railroad, just driving into their interlocutors with the force of their intellect. Their arguments make perfect sense to themselves, but not always to those around them. Gold Signs are interested in a wide variety of topics, so they tend to be Jacks-of-all-trade, and can have trouble dedicating themselves to just a single hobby or career. They have a tendency to be high-energy, and can stress people out, including themselves. Their anxiety is such that they often need quite a bit of time alone with their projects. They can talk circles around most people, and they aren't afraid to use their intelligence to manipulate others to get what they want. They are good at making money, and also good at spending it. They aren't great financial planners, tending toward impulse purchases. In romance they lean toward partners who can keep up with them, both with their intellect and their energy, which can both be hard to match. ",
    sign: "Gemini",
    color: [255, 255, 0],
    dates: ["May 21", "June 21"],
  },
  Lime: {
    name: "Lime",
    description:
      "Lime Signs are tumultuous, bringing great emotion and creativity to their endeavors. They are resolute in their decisions; if they are going to do something, they do it. They have a tendency toward melodrama, especially when they feel passionately about something, and their bad moods are loud and usually difficult to conceal. Hiding their feelings does not come naturally to them, so many Lime Signs cultivate a hard outer shell to hide the passionate, caring person inside. Lime Signs tend to have a large group of friends-they draw people to them with allure and the promise of excitement, and are usually unaware that they are doing it. They tend to focus on their own flaws, rather than their good points. Although they are exceedingly kind and empathetic individuals, many Lime Signs posses a mean streak. If you catch them on a bad day, they can be incredibly vicious. But it they take care to use their power for good, they make very loyal companions. Romance is extremely important to Lime Signs, and when they fall, they fall hard. They don't take rejection well, and a breakup can send them into a tailspin requiring an extended period of recovery.",
    sign: "Cancer",
    color: [127, 255, 0],
    dates: ["June 22", "July 22"],
  },
  Olive: {
    name: "Olive",
    description:
      "Olive Signs are, by and large, incredibly agreeable people. They are generous and enthusiastic, ready to offer help to anyone who needs it. Luck plays a large role in their lives; Olive Signs have a knack for being in the right place at the right time. And even in the case that their luck goes bad, they can ride rough patches out without falling too far into depression or hopelessness. That said, Olive Signs are most comfortable with things that they are familiar with; new places and ideas often alarm them, resulting in a dogmatic insistence that their way is the right way. They can be quite bossy and domineering, although that usually comes out of a genuine belief that they know best and can help the ones they care about. They are extremely faithful friends and lovers, ready to drop everything and go into helper mode. However, if their trust is breached, there's no going back. No one can hold a grudge like an Olive Sign, and they aren't afraid to just pick up and leave if they decide something isn't working for them. Romance and companionship are extremely important to them, so even if they get hurt, their hearts remain open.",
    sign: "Leo",
    color: [0, 255, 0],
    dates: ["July 23", "August 22"],
  },
  Jade: {
    name: "Jade",
    description:
      "Jade Signs are the zodiac's caretakers. Intelligent and steady, they are excellent organizers and planners. They are detail-oriented, and can tend toward perfectionism, never satisfied with their endeavors. If you hire on a Jade Sign, be prepared for an excellent product, but also no peace until that project is flawless. They are fussy and particular, which can cause friction with those around them, although a Jade Sign holds no one to as high a standard as they hold themselves. Since they are shy with strangers and slow to open up, Jade Signs can often come off as timid or doormats, when really they just prefer to come at conflicts in a less combative way. Naturally loyal and loving, they make wonderful doctors, parents, and caretakers, whether they are taking care of people, pets, or plants. In relationships, they can be slow to open up, and need someone willing to be patient enough to go at their pace. If all of this makes Jade Signs sound soft and nurturing, they are, but keep in mind that they can also be fiercely destructive if those they care about are threatened. It takes a lot to make a Jade Sign snap, but if they do, take cover.",
    sign: "Virgo",
    color: [0, 255, 127],
    dates: ["August 23", "September 22"],
  },
  Teal: {
    name: "Teal",
    description:
      "Teal Signs are natural charmers. Social and flirtatious, they are great at parties and public speaking events. Even though they aren't afraid to use their many engaging qualities in both personal and business ventures, they have a strong moral sense. Right and wrong are very obvious to a Teal Sign, and it can frustrate them that others don't see the world the same way they do. Their idealism can make them strong defenders of justice, but it can also result in them being incredibly let down. Their strict adherence to procedure can lead to errors in judgement; they can be gullible and too quick to trust. They have vibrant imaginations, and enjoy fiction and roleplaying, and often those games will resemble the lives they want to be living. Deep down, they often long for a hero, someone they can idolize and count on, with the smarts and charisma to keep up with them. Unfortunately, they have a tendency to get involved with people who are very obviously wrong for them out of a desire not to be alone. Many Teal Signs are better off being single, at least until someone really extraordinary comes along.",
    sign: "Libra",
    color: [0, 255, 255],
    dates: ["September 23", "October 23"],
  },
  Blue: {
    name: "Blue",
    description:
      "Let's not mince words: Blue Signs are the ones to watch. Of all the sign classes, they have the potential to do the most good, but also cause the worse harm. They can be incredibly effective, and also incredibly destructive. Tell a Blue Sign this and chances are they would agree with you. They are magnetic and adaptive, able to adjust how they present themselves in any situation. They have a mask for every occasion. They are obsessively dedicated, willing to throw themselves into work, play, and everything in between. Because of this, Blue Signs are highly valuable allies and friends. However, they are very selective when it comes to who they let into their inner circle. You could be best friends with a Blue Sign and still never truly know them. They are powerful and successful, but they also tend toward jealousy. They often resent those they see as more well-positioned than they are. A well-adjusted Blue Sign is fantastically competent and inspiring, but a Blue Sign at their worst is a force for chaos. In love they can find themselves having to choose between their ambitions and their relationships, often with great difficulty.",
    sign: "Scorpio",
    color: [0, 127, 255],
    dates: ["October 24", "November 21"],
  },
  Indigo: {
    name: "Indigo",
    description:
      "Indigo Signs are the enthusiasts of the sign classes. Friendly and cheerful, their optimism is contagious. Being around a well-adjusted Indigo Sign is always a good time. It's hard not to be drawn into their excitable orbit, just like they are drawn in by anything and everything that piques their interest. And those interests are liable to change at any time. Indigo Signs will often surprise their friends and family by declaring they are no longer interested in what just last week they were claiming was their jam. If you catch an Indigo Signs in a philosophical mood, they can be unexpectedly poignant and introspective. A downside of all this jovial enthusiasm is that Indigo Signs often don't know their own strength. They are known to be careless, both physically and emotionally, their conversations punctuated by jostling elbows and tactless comments. They don't usually mean to offend, and are often shocked to find out they upset anyone. When this happens, they can dig their heels in and insist they did nothing wrong. In romance, Indigo Signs need partners who can keep up with their expansive personalities, as well as forgive them for the occasional hurt feeling or two.",
    sign: "Sagittarius",
    color: [0, 0, 255],
    dates: ["November 22", "December 21"],
  },
  Purple: {
    name: "Purple",
    description:
      "Purple Signs are the workaholics of the sign classes. Ambitious and driven, they have a very specific path in mind to reach the pinnacle of their field, and will work tirelessly toward it. However, if their practical brains convince them that their goal is unrealistic, they may be slow to trust anyone with the secret of their true desires. They are often very funny, their wit veering toward the dryly macabre. Their fatalism can be incredibly humorous or terrible, depending who you ask. Purple Signs are usually the people who will say out loud what everyone else was thinking but was too nervous to mention. They are very stubborn, and once they've made up their mind about something, whether it be a restaurant choice or a political affiliation, it is difficult to change. They have trouble admitting they were mistaken, and also that they are upset. An oft-repeated phrase of the Purple Signs is, \"It's fine, don't worry about it.\" They will let arguments fester rather than face them head on. In love they tend to be strictly monogamous and fiercely devoted, ready to pledge themselves to a person the same way they do their goals-utterly, and without reservation.",
    sign: "Capricorn",
    color: [127, 0, 255],
    dates: ["December 22", "January 19"],
  },
  Violet: {
    name: "Violet",
    description:
      "Violet Signs are the universe's eccentrics. Forget marching to their own drummer-Violets built their own drum, and it's probably weird. A good deal of this is natural, but they also have a distinct bent toward contrariness. They are the sorts to give the popular thing a pass. Personable and outlandish, they are ready to make friends with anyone, although if they aren't careful their 'game for anything' attitude can come across as clingy or desperate. When their feelings are reciprocated, however, they are very loyal friends. Politics and humanitarian causes are often very important to Violet Signs, and they will turn their considerable inventive energy into a sort of noblesse oblige, happy to offer their nontraditional approaches to help others. At their very best Violet Signs are artistic and inspired, but they tread the fine line between genius and maniac. Too often their more esoteric interests can come across as perverse or untoward, and they can have a hard time holding their tempers, especially if they feel that they are being belittled or ignored. Intelligence is enormously attractive to Violet Signs, and often an intellectual connection is necessary for them to be attracted to a prospective partner.",
    sign: "Aquarius",
    color: [255, 0, 255],
    dates: ["January 20", "February 18"],
  },
  Fuchsia: {
    name: "Fuchsia",
    description:
      "Fuchsia Signs are the final of the sign classes, fittingly, also the most enigmatic. Possessing a strong imagination, they have an otherworldly quality to them that draws others in. Often, it has more to do with what they don't tell you than what they do, giving them an air of mystery that would more than likely perplex a Fuchsia sign if you told them about it. They aren't usually trying to be alluring-they're just lost in thought. Highly emotional, Fuchsia signs are sensitive and anxious, and tend to spend a lot of time worrying-about the world, the future, and what others think of them. They are artistic and talented, but can suffer from crippling bouts of depression, holding themselves to impossibly high standards. They have rich fantasy lives, and can get so caught up in daydreams that they sometimes forget to actually do things. Many Fuchsia Signs have trouble with follow-through, and it can take a lot to kick them out of their inertia. As far as romance goes, they need partners who are willing to put in the time to go at their pace, and who can handle how sensitive and emotional they can be.",
    sign: "Pisces",
    color: [255, 0, 127],
    dates: ["February 19", "March 20"],
  },
};

export const SignColorList = Object.values(SignColor);

export const TrueSignSchema = yup.object({
  name: yup.string().required(),
  aspect: AspectSchema.required(),
  sway: SwaySchema.required(),
  color: SignColorSchema.required(),
});

export type TrueSignType = {
  name: string;
  aspect: AspectType;
  sway: SwayType;
  color: SignColorType;
};

export const TrueSign: {
  [key: string]: TrueSignType;
} = {
  Aries: {
    name: "Aries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arsces: {
    name: "Arsces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arrius: {
    name: "Arrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Ariborn: {
    name: "Ariborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arittarius: {
    name: "Arittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arpia: {
    name: "Arpia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arza: {
    name: "Arza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arga: {
    name: "Arga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Aro: {
    name: "Aro",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arcen: {
    name: "Arcen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Armini: {
    name: "Armini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arun: {
    name: "Arun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Rust,
  },
  Arist: {
    name: "Arist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arsci: {
    name: "Arsci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arnius: {
    name: "Arnius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Aricorn: {
    name: "Aricorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arittanius: {
    name: "Arittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arpio: {
    name: "Arpio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arra: {
    name: "Arra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Argo: {
    name: "Argo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arlo: {
    name: "Arlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arcer: {
    name: "Arcer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Armino: {
    name: "Armino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Arus: {
    name: "Arus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Rust,
  },
  Taurus: {
    name: "Taurus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurist: {
    name: "Taurist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taursci: {
    name: "Taursci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurnius: {
    name: "Taurnius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Tauricorn: {
    name: "Tauricorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurittanius: {
    name: "Taurittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurpio: {
    name: "Taurpio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurra: {
    name: "Taurra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurgo: {
    name: "Taurgo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurlo: {
    name: "Taurlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurcer: {
    name: "Taurcer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurmino: {
    name: "Taurmino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Bronze,
  },
  Taurun: {
    name: "Taurun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Tauries: {
    name: "Tauries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taursces: {
    name: "Taursces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurrius: {
    name: "Taurrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Tauriborn: {
    name: "Tauriborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurittarius: {
    name: "Taurittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurpia: {
    name: "Taurpia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurza: {
    name: "Taurza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurga: {
    name: "Taurga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Tauro: {
    name: "Tauro",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurcen: {
    name: "Taurcen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Taurmini: {
    name: "Taurmini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Bronze,
  },
  Gemini: {
    name: "Gemini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemun: {
    name: "Gemun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemries: {
    name: "Gemries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemsces: {
    name: "Gemsces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemrius: {
    name: "Gemrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemiborn: {
    name: "Gemiborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemittarius: {
    name: "Gemittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gempia: {
    name: "Gempia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemza: {
    name: "Gemza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemga: {
    name: "Gemga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemo: {
    name: "Gemo",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemcen: {
    name: "Gemcen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Gold,
  },
  Gemino: {
    name: "Gemino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemus: {
    name: "Gemus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemrist: {
    name: "Gemrist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemsci: {
    name: "Gemsci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemnius: {
    name: "Gemnius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemicorn: {
    name: "Gemicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemittanius: {
    name: "Gemittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gempio: {
    name: "Gempio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemra: {
    name: "Gemra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemgo: {
    name: "Gemgo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemlo: {
    name: "Gemlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Gemcer: {
    name: "Gemcer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Gold,
  },
  Cancer: {
    name: "Cancer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Camino: {
    name: "Camino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canus: {
    name: "Canus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canrist: {
    name: "Canrist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Cansci: {
    name: "Cansci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Cannius: {
    name: "Cannius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canicorn: {
    name: "Canicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canittanius: {
    name: "Canittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canpio: {
    name: "Canpio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canra: {
    name: "Canra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Cango: {
    name: "Cango",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Canlo: {
    name: "Canlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Lime,
  },
  Cancen: {
    name: "Cancen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Camini: {
    name: "Camini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canun: {
    name: "Canun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canries: {
    name: "Canries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Cansces: {
    name: "Cansces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canrius: {
    name: "Canrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Caniborn: {
    name: "Caniborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canittarius: {
    name: "Canittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canpia: {
    name: "Canpia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canza: {
    name: "Canza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Canga: {
    name: "Canga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Cano: {
    name: "Cano",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Lime,
  },
  Leo: {
    name: "Leo",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lecen: {
    name: "Lecen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lemini: {
    name: "Lemini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Leun: {
    name: "Leun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Leries: {
    name: "Leries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lesces: {
    name: "Lesces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lerius: {
    name: "Lerius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Leiborn: {
    name: "Leiborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Leittarius: {
    name: "Leittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lepia: {
    name: "Lepia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Leza: {
    name: "Leza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lega: {
    name: "Lega",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Olive,
  },
  Lelo: {
    name: "Lelo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lecer: {
    name: "Lecer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lemino: {
    name: "Lemino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Leus: {
    name: "Leus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lerist: {
    name: "Lerist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lesci: {
    name: "Lesci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lenius: {
    name: "Lenius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Leicorn: {
    name: "Leicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Leittanius: {
    name: "Leittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lepio: {
    name: "Lepio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lera: {
    name: "Lera",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Lego: {
    name: "Lego",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Olive,
  },
  Virgo: {
    name: "Virgo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virlo: {
    name: "Virlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Vircer: {
    name: "Vircer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virmino: {
    name: "Virmino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virus: {
    name: "Virus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virist: {
    name: "Virist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virsci: {
    name: "Virsci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virnius: {
    name: "Virnius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Viricorn: {
    name: "Viricorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virittanius: {
    name: "Virittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virpio: {
    name: "Virpio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virra: {
    name: "Virra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Jade,
  },
  Virga: {
    name: "Virga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Viro: {
    name: "Viro",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Vircen: {
    name: "Vircen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virmini: {
    name: "Virmini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virun: {
    name: "Virun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Viries: {
    name: "Viries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virsces: {
    name: "Virsces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virrius: {
    name: "Virrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Viriborn: {
    name: "Viriborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virittarius: {
    name: "Virittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virpia: {
    name: "Virpia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Virza: {
    name: "Virza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Jade,
  },
  Libra: {
    name: "Libra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Ligo: {
    name: "Ligo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Liblo: {
    name: "Liblo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Licer: {
    name: "Licer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Limino: {
    name: "Limino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libus: {
    name: "Libus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Librist: {
    name: "Librist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libsci: {
    name: "Libsci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libnius: {
    name: "Libnius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libicorn: {
    name: "Libicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libittanius: {
    name: "Libittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Lipio: {
    name: "Lipio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Teal,
  },
  Libza: {
    name: "Libza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Liga: {
    name: "Liga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libo: {
    name: "Libo",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Licen: {
    name: "Licen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Limini: {
    name: "Limini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libun: {
    name: "Libun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libries: {
    name: "Libries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libsces: {
    name: "Libsces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Librius: {
    name: "Librius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libiborn: {
    name: "Libiborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Libittarius: {
    name: "Libittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Lipia: {
    name: "Lipia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Teal,
  },
  Scorpio: {
    name: "Scorpio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorra: {
    name: "Scorra",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorgo: {
    name: "Scorgo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorlo: {
    name: "Scorlo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorcer: {
    name: "Scorcer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scormino: {
    name: "Scormino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorus: {
    name: "Scorus",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorist: {
    name: "Scorist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorsci: {
    name: "Scorsci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scornius: {
    name: "Scornius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scoricorn: {
    name: "Scoricorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorittanius: {
    name: "Scorittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Blue,
  },
  Scorpia: {
    name: "Scorpia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorza: {
    name: "Scorza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorga: {
    name: "Scorga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scoro: {
    name: "Scoro",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorcen: {
    name: "Scorcen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scormini: {
    name: "Scormini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorun: {
    name: "Scorun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scories: {
    name: "Scories",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorsces: {
    name: "Scorsces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorrius: {
    name: "Scorrius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scoriborn: {
    name: "Scoriborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Scorittarius: {
    name: "Scorittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Blue,
  },
  Sagittarius: {
    name: "Sagittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagipia: {
    name: "Sagipia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagiza: {
    name: "Sagiza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagiga: {
    name: "Sagiga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagio: {
    name: "Sagio",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagicen: {
    name: "Sagicen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagimini: {
    name: "Sagimini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagiun: {
    name: "Sagiun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagiries: {
    name: "Sagiries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagisces: {
    name: "Sagisces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagirius: {
    name: "Sagirius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagiborn: {
    name: "Sagiborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Indigo,
  },
  Sagittanius: {
    name: "Sagittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagipio: {
    name: "Sagipio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagira: {
    name: "Sagira",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagigo: {
    name: "Sagigo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagilo: {
    name: "Sagilo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagicer: {
    name: "Sagicer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagimino: {
    name: "Sagimino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagius: {
    name: "Sagius",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagirist: {
    name: "Sagirist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagisci: {
    name: "Sagisci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Saginius: {
    name: "Saginius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Sagicorn: {
    name: "Sagicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Indigo,
  },
  Capricorn: {
    name: "Capricorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprittanius: {
    name: "Caprittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Capripio: {
    name: "Capripio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprira: {
    name: "Caprira",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprigo: {
    name: "Caprigo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprilo: {
    name: "Caprilo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Capricer: {
    name: "Capricer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprimino: {
    name: "Caprimino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprius: {
    name: "Caprius",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprist: {
    name: "Caprist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprisci: {
    name: "Caprisci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Caprinius: {
    name: "Caprinius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Purple,
  },
  Capriborn: {
    name: "Capriborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Caprittarius: {
    name: "Caprittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capripia: {
    name: "Capripia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capriza: {
    name: "Capriza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capriga: {
    name: "Capriga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Caprio: {
    name: "Caprio",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capricen: {
    name: "Capricen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Caprimini: {
    name: "Caprimini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capriun: {
    name: "Capriun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capries: {
    name: "Capries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Caprisces: {
    name: "Caprisces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Capririus: {
    name: "Capririus",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Purple,
  },
  Aquarius: {
    name: "Aquarius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquiborn: {
    name: "Aquiborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquittarius: {
    name: "Aquittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquapia: {
    name: "Aquapia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquaza: {
    name: "Aquaza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquaga: {
    name: "Aquaga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquo: {
    name: "Aquo",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquacen: {
    name: "Aquacen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquamini: {
    name: "Aquamini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquiun: {
    name: "Aquiun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquaries: {
    name: "Aquaries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquasces: {
    name: "Aquasces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Violet,
  },
  Aquanius: {
    name: "Aquanius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquicorn: {
    name: "Aquicorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquittanius: {
    name: "Aquittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquapio: {
    name: "Aquapio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquara: {
    name: "Aquara",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquago: {
    name: "Aquago",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aqualo: {
    name: "Aqualo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquacer: {
    name: "Aquacer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquamino: {
    name: "Aquamino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquius: {
    name: "Aquius",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquarist: {
    name: "Aquarist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Aquasci: {
    name: "Aquasci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Violet,
  },
  Pisces: {
    name: "Pisces",
    aspect: Aspect.Life,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pirius: {
    name: "Pirius",
    aspect: Aspect.Hope,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Piborn: {
    name: "Piborn",
    aspect: Aspect.Rage,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pittarius: {
    name: "Pittarius",
    aspect: Aspect.Void,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pipia: {
    name: "Pipia",
    aspect: Aspect.Light,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Piza: {
    name: "Piza",
    aspect: Aspect.Mind,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Piga: {
    name: "Piga",
    aspect: Aspect.Space,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pio: {
    name: "Pio",
    aspect: Aspect.Heart,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Picen: {
    name: "Picen",
    aspect: Aspect.Blood,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pimini: {
    name: "Pimini",
    aspect: Aspect.Doom,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Piun: {
    name: "Piun",
    aspect: Aspect.Breath,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Piries: {
    name: "Piries",
    aspect: Aspect.Time,
    sway: Sway.Derse,
    color: SignColor.Fuchsia,
  },
  Pisci: {
    name: "Pisci",
    aspect: Aspect.Life,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pinius: {
    name: "Pinius",
    aspect: Aspect.Hope,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Picorn: {
    name: "Picorn",
    aspect: Aspect.Rage,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pittanius: {
    name: "Pittanius",
    aspect: Aspect.Void,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pipio: {
    name: "Pipio",
    aspect: Aspect.Light,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pira: {
    name: "Pira",
    aspect: Aspect.Mind,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pigo: {
    name: "Pigo",
    aspect: Aspect.Space,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pilo: {
    name: "Pilo",
    aspect: Aspect.Heart,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Picer: {
    name: "Picer",
    aspect: Aspect.Blood,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pimino: {
    name: "Pimino",
    aspect: Aspect.Doom,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pius: {
    name: "Pius",
    aspect: Aspect.Breath,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
  Pirist: {
    name: "Pirist",
    aspect: Aspect.Time,
    sway: Sway.Prospit,
    color: SignColor.Fuchsia,
  },
};

export const TrueSignList = Object.keys(TrueSign);
