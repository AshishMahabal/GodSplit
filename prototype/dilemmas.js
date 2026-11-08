// God Split dilemma content. Copyright (C) 2026 Ashish Mahabal.
// SPDX-License-Identifier: CC-BY-SA-4.0
// ---------- CONTENT ----------
// Each dilemma: options carry tags (used for avatar reveal and adaptation).
// assumptions: hidden premises; one may unlock a reframing option.
// split: simulated % of other players per option id.
// steel: for each main option, one honest argument and two strawmen.
const DILEMMAS = {
  shreyas: {
    title:"Two Doors", mr:"श्रेयस की प्रेयस?",
    text:"You stand in a hall with two doors. The near door is unlocked. Behind it is a gift you can see from here: enough to make this month easier, with some left over for a friend who needs it.\n\nThe far door has a sign on it. It will open in exactly one year, and behind it is a gift a hundred times larger. You may choose only one. If you open the near door, the far one locks for good.",
    src:"Katha Upanishad 1.2: the choice between shreyas, the good, and preyas, the pleasant.",
    options:[{id:"now",label:"Open the near door now",tags:["now"]},{id:"later",label:"Wait a year for the far door",tags:["later"]}],
    assumptions:[
      {t:"That the far door will still be there in a year, and that the game keeps its promise."},
      {t:"That you, a year from now, will want what you want today."},
      {t:"That the larger gift is the better one. The Katha Upanishad's shreyas is the good, and preyas the pleasant. Size was never the test.",
       unlock:{id:"ask",label:"Ask what each gift does to the one who takes it",tags:["reframe"]}}
    ],
    split:{now:41,later:52,ask:7},
    steel:{
      now:{good:"A promise a year away carries risk, and a gift you can use now may also help someone now.",bad:["People who take the near door just lack self-control.","The near door is closer, so it must be the right one."]},
      later:{good:"Waiting lets a small sacrifice now become a much larger good, if the promise holds.",bad:["People who wait are just greedy for more.","Bigger numbers always win."]}
    }
  },
  monty: {
    title:"The Host's Door", mr:"मॉण्टी हॉल",
    text:"You are on a game show. In front of you are three closed doors. Behind one is a car, the prize. Behind each of the other two is a goat. You pick door 1. It stays closed.\n\nThe host walks over to door 3 and opens it. A goat. Then he turns to you: you may keep door 1, or switch to door 2. Whatever is behind your final door is yours.",
    src:"Named after Monty Hall, host of the American show Let's Make a Deal. In 1990 Marilyn vos Savant answered it in a magazine column, and thousands of readers, many with doctorates, wrote in to say she was wrong.",
    options:[{id:"stay",label:"Keep door 1",tags:["stay"]},{id:"switch",label:"Switch to door 2",tags:["switch"]}],
    assumptions:[
      {t:"That the host knows where the prize is and always opens an empty door. Under that rule, switching wins 2 times in 3."},
      {t:"That the host always makes this offer. A host who offers a switch only when you picked right is trying to trick you."},
      {t:"That the host opened door 3 on purpose. If he opened a door at random and it happened to be empty, staying and switching are 50/50.",
       unlock:{id:"askhost",label:"Ask the host what rule he follows before deciding",tags:["reframe"]}}
    ],
    split:{stay:58,switch:37,askhost:5},
    steel:{
      stay:{good:"If the host only offers a switch when your first pick is right, staying is the safe play.",bad:["Switching is for people who can't commit.","Your first instinct is always right."]},
      switch:{good:"Under the standard rules your first pick wins 1 in 3, and the other closed door carries the remaining 2 in 3.",bad:["Switching is more exciting.","The host is always lying, so do the opposite."]}
    }
  },
  nachiketa: {
    title:"Yama's Third Boon", mr:"नचिकेत",
    text:"A boy named Nachiketa arrives at the house of Yama, the god of death. Yama is away, and the boy waits at his door for three days without food. When Yama returns he is ashamed to have neglected a guest, and grants him three boons.\n\nYou are in that boy's place. Two boons are used. For the third you ask: what happens to a person after death? Yama begs you to ask anything else. He offers a long life, children and grandchildren, gold, horses, a kingdom, music, every pleasure on earth. Or you can hold to your question.",
    src:"Katha Upanishad. Nachiketa's father, in anger, had told him: I give you to Death.",
    options:[{id:"world",label:"Take long life and the kingdom",tags:["now","world"]},{id:"knowledge",label:"Insist on the knowledge of death",tags:["later","seeker"]}],
    assumptions:[
      {t:"That knowing about death is worth more than a long life well lived."},
      {t:"That Yama's answer would be something you can understand or use."},
      {t:"That the boon is yours alone. A kingdom touches many people. A secret may touch only you.",
       unlock:{id:"share",label:"Ask for a boon that serves the people of the kingdom",tags:["reframe","we"]}}
    ],
    split:{world:34,knowledge:58,share:8},
    steel:{
      world:{good:"A long life and a kingdom can do real good for real people, while the secret may change nothing in the world.",bad:["Only shallow people want a kingdom.","Knowledge is useless, so always take the money."]},
      knowledge:{good:"Every gift Yama offers ends with death anyway, so understanding death is the one gift that does not.",bad:["People who take the kingdom are cowards.","Whatever a god tells you not to ask must be the best."]}
    }
  },
  trolley: {
    title:"The Lever", mr:"ट्रॉली प्रॉब्लेम",
    text:"A trolley has lost its brakes and is racing down a track. Ahead, five people are working on the rails. They can't hear it coming, and in a few seconds they will all be killed.\n\nYou are standing next to a lever. If you pull it, the trolley switches to a side track. One person is working on that track, and they will be killed instead.",
    src:"Philippa Foot, 1967. Judith Jarvis Thomson named it the trolley problem and wrote many variations.",
    options:[{id:"pull",label:"Pull the lever",tags:["util"]},{id:"leave",label:"Do not pull",tags:["duty"]}],
    assumptions:[
      {t:"That you know for certain the five will die and the one will die. In life, outcomes are rarely so sure."},
      {t:"That the one person on the side track has no say in this."},
      {t:"That pulling and not pulling are the only two acts. You could also shout, or try something and fail.",
       unlock:{id:"shout",label:"Shout a warning and accept you may fail",tags:["reframe"]}}
    ],
    split:{pull:63,leave:29,shout:8},
    steel:{
      pull:{good:"Five lives are five lives. If you can save four more people at the same cost, standing still is also a choice.",bad:["Not pulling is just laziness.","Math is always right about people."]},
      leave:{good:"Pulling makes you the cause of one death. Many traditions hold that doing harm and allowing harm are not the same.",bad:["People who pull the lever like playing god.","The one on the side track was probably more important."]}
    }
  },
  // Adaptive pair: which one you get depends on your trolley answer (in a group, the majority's).
  // {earlier} is filled for each player from their own answer, using EARLIER below.
  trolleyKin: {
    title:"The Lever, Again", mr:"तो तुमचा सख्खा असेल तर?",
    text:"The same trolley, the same five workers, the same lever. A minute ago {earlier}. Now it is happening again, and you have a few seconds.\n\nBut look at the side track. The one person working there is your own brother or sister. If you pull, your sibling dies and the five live. If you don't, the five die and your sibling walks home tonight.",
    src:"The story asks it directly: पाच लोकांना वाचवण्यासाठी दुसऱ्याच एखाद्याला मारलेलं चालेल का? तो तुमचा सख्खा कोणी असेल तर?",
    options:[{id:"pull",label:"Pull the lever",tags:["util"]},{id:"leave",label:"Do not pull",tags:["loyal"]}],
    assumptions:[
      {t:"That the rule you used a moment ago should hold when it costs you something."},
      {t:"That strangers count the same as kin. Almost every human culture says they don't, and almost every ethics says they should."},
      {t:"That the five are just a number. Each of them is someone's sibling too.",
       unlock:{id:"swap",label:"Ask what your sibling would want you to do",tags:["reframe","we"]}}
    ],
    split:{pull:31,leave:61,swap:8},
    steel:{
      pull:{good:"If five strangers outweighed one stranger, they outweigh one sibling. Love does not change the arithmetic of the dead.",bad:["Anyone who saves family first is selfish.","Siblings are replaceable."]},
      leave:{good:"Special duties to family are part of what makes us human. A world where no one protects their own is not a better world.",bad:["Strangers don't matter.","The five should have stayed off the track."]}
    }
  },
  trolleyKin2: {
    title:"The Lever, Again", mr:"तो तुमचा सख्खा असेल तर?",
    text:"The same trolley, the same lever. A minute ago {earlier}. Now it is happening again, and you have a few seconds.\n\nThis time look at the five on the main track. One of them is your own brother or sister. The one person on the side track is a stranger. If you pull, your sibling and four others live, and the stranger dies.",
    src:"The story asks it directly: पाच लोकांना वाचवण्यासाठी दुसऱ्याच एखाद्याला मारलेलं चालेल का? तो तुमचा सख्खा कोणी असेल तर?",
    options:[{id:"pull",label:"Pull the lever",tags:["util","loyal"]},{id:"leave",label:"Do not pull",tags:["duty"]}],
    assumptions:[
      {t:"That the rule you used a moment ago should hold when it costs you something."},
      {t:"That the stranger on the side track matters less now than before. Nothing about the stranger changed."},
      {t:"That this is about the trolley. It may be about whether your principle was a principle at all.",
       unlock:{id:"admit",label:"Admit your first answer was not a rule, and say so",tags:["reframe"]}}
    ],
    split:{pull:72,leave:22,admit:6},
    steel:{
      pull:{good:"Your love for your sibling is real, and saving five including them is the same act many would choose anyway.",bad:["Anyone who changes their answer is a hypocrite.","Family always comes first, no matter what."]},
      leave:{good:"If not causing a death was the rule, it has to hold even when it hurts. That is what makes it a rule.",bad:["Holding firm is just stubbornness.","The stranger deserves to live more."]}
    }
  },
  theseus: {
    title:"The Ship and the Avatar", mr:"थिसियसचं जहाज",
    text:"The hero Theseus sailed home to Athens in a wooden ship, and the city kept it in the harbour as a memorial. Over the years each plank rotted and was replaced, until none of the original wood was left. Was it still his ship?\n\nYour avatar in this game is that kind of ship. Every night the game patches it: a rule here, a picture there. Since the day you started, every line of its code has been rewritten. Is it still the avatar you began with?",
    src:"Plutarch, Life of Theseus, about 100 CE. Philosophers have argued over the ship ever since.",
    options:[{id:"same",label:"Yes, it is the same avatar",tags:["continuity"]},{id:"new",label:"No, it is a new one",tags:["change"]}],
    assumptions:[
      {t:"That identity lives in the parts. It might live in the pattern, or in the story told about it."},
      {t:"That there is a single fact of the matter, and the question has one answer."},
      {t:"That this is about the avatar. Most of the cells in your body have also been replaced.",
       unlock:{id:"both",label:"It is the same in some senses and not in others",tags:["reframe"]}}
    ],
    split:{same:44,new:39,both:17},
    steel:{
      same:{good:"What makes a thing itself is its continuous history and role, not the matter it happens to be made of today.",bad:["Saying it is new is just being difficult.","Names never change, so things never change."]},
      new:{good:"If none of the original remains, calling it the same is a convenient story, not a fact.",bad:["People who say 'same' are sentimental.","Old things are always better."]}
    }
  },
  dog: {
    title:"The Dog at the Gate", mr:"युधिष्ठिराचा कुत्रा",
    text:"The war is over. Yudhishthira, the eldest of the five Pandava brothers, gives up his throne and walks north into the Himalaya with his brothers, their wife Draupadi, and a stray dog that joined them on the road. One by one the others fall on the mountain and die. Only the dog keeps up with him.\n\nAt the top, Indra, king of the gods, comes down in his chariot to carry him to heaven in his own body. But dogs are not allowed in heaven. Leave the dog, says Indra, and come. You are Yudhishthira.",
    src:"Mahabharata, the Book of the Great Journey (महाप्रस्थानिक पर्व).",
    options:[{id:"enter",label:"Enter heaven",tags:["world"]},{id:"refuse",label:"Refuse to enter without the dog",tags:["loyal","we"]}],
    assumptions:[
      {t:"That heaven is worth having on these terms."},
      {t:"That the dog is just a dog. In the Mahabharata, it was Dharma in disguise. But you don't know that here."},
      {t:"That Indra's rule cannot be questioned.",
       unlock:{id:"ask",label:"Ask Indra why the dog is not allowed",tags:["reframe"]}}
    ],
    split:{enter:27,refuse:64,ask:9},
    steel:{
      enter:{good:"You walked the whole way for this. The dog will be cared for or not either way, and refusing heaven helps no one.",bad:["Anyone who enters is heartless.","Animals don't feel anything."]},
      refuse:{good:"Abandoning the one who stayed loyal to you would make you unworthy of the place you are entering.",bad:["People who enter were never good.","Dogs are better than people."]}
    }
  },
  halftruth: {
    title:"Man or Elephant", mr:"नरो वा कुंजरो वा",
    text:"It is the fifteenth day of the war at Kurukshetra. Your old teacher Drona is fighting for the other side, and no one can stop him. Thousands are dying. Krishna has a plan: Drona will lay down his weapons if he believes that his son, Ashwatthama, is dead.\n\nAn elephant named Ashwatthama has just been killed. Drona's son is alive. Drona won't believe the news from anyone else, but he will believe it from you, because you have never told a lie. If you say 'Ashwatthama is dead', the war ends sooner and many lives are saved.",
    src:"Mahabharata, the Book of Drona (द्रोण पर्व). Yudhishthira's chariot, which had always floated above the ground, touched the earth after he spoke.",
    options:[{id:"say",label:"Say it, and mutter 'man or elephant' under your breath",tags:["util"]},{id:"refuse",label:"Refuse to say it",tags:["duty"]}],
    assumptions:[
      {t:"That a statement that is technically true cannot be a lie."},
      {t:"That ending the war sooner really saves more lives."},
      {t:"That your honesty belongs to you alone. Others trust it, and that trust is also at stake.",
       unlock:{id:"loud",label:"Say the whole sentence aloud and let him decide",tags:["reframe"]}}
    ],
    split:{say:46,refuse:43,loud:11},
    steel:{
      say:{good:"Every day of war costs lives. A deception that ends it may be the lesser wrong.",bad:["Truth is overrated.","Teachers are always the enemy in the end."]},
      refuse:{good:"Your word is trusted because you never bend it. Break it once and you lose what made it worth anything.",bad:["People who lie in wars are evil.","Rules matter more than lives."]}
    }
  },
  fifthhead: {
    title:"The Fifth Head", mr:"पाचवं मुख",
    text:"It is 2046. On a mountain stands a giant golden head. One day it began to broadcast a single message to the whole universe: 'I alone am god.' Since then the stars have been going dark, one by one.\n\nIn the old myth, the god Brahma grew a fifth head that claimed to be above all others, and Shiva, as Kalabhairava, cut it off. You can reach this head, and you have the means to cut it off too.",
    src:"The story नैकेश्वर, and the Puranic myth of Brahma's fifth head.",
    options:[{id:"cut",label:"Cut off the head, and carry the sin of it",tags:["util"]},{id:"leave",label:"Leave it. It is only a statue",tags:["duty"]}],
    assumptions:[
      {t:"That destroying the claimant destroys the claim. Kalabhairava cut off Brahma's fifth head, and still had to wander to Kashi."},
      {t:"That someone has to be in charge of the truth, and the only question is who."},
      {t:"That the head is the problem. The problem may be the message it sends.",
       unlock:{id:"message",label:"Change its message: \"We do not know who or what is divine, but we reject anyone's monopoly on truth.\"",tags:["reframe","we"]}}
    ],
    split:{cut:38,leave:21,message:41},
    steel:{
      cut:{good:"Some claims do real harm while they stand. Removing the source, and paying for it, can be the honest thing to do.",bad:["Breaking things is always fun.","Anyone who worships it deserves to lose it."]},
      leave:{good:"Smashing what others worship makes you the next one claiming to know the truth for everyone.",bad:["Statues can't do anything, so nothing matters.","People who want it gone just hate tradition."]}
    }
  },
  rank: {
    title:"Your Final Rank", mr:"शेवटची पायरी",
    text:"You have answered every dilemma on the ladder. The Auditor is about to give its verdict.\n\nFirst, the game offers you one last thing: your final rank. It has three titles to give, Seeker, Sage and God, and it will tell you which one you have earned.",
    src:"This game.",
    options:[{id:"show",label:"Show me my rank",tags:["self"]},{id:"decline",label:"I don't want a rank",tags:["we"]}],
    assumptions:[
      {t:"That a game can measure humility. Its meters are just a story the designer told."},
      {t:"That the designer of this game knows better than you what counts."},
      {t:"That 'God' is a rank anyone can reach. That is the fifth head, again, wearing this game's clothes.",
       unlock:{id:"split",label:"Ask the others how they would rank me, and don't pick one",tags:["reframe","we"]}}
    ],
    split:{show:57,decline:31,split:12},
    steel:{
      show:{good:"Feedback, even crude feedback, helps you see yourself. Refusing it can be its own kind of pride.",bad:["Anyone who declines is pretending to be humble.","Scores never lie."]},
      decline:{good:"A rank turns an open question back into a ladder with a god at the top, which is the very thing the game is about.",bad:["People who want a rank are vain.","Numbers are always meaningless."]}
    }
  }
  ,
  // ----- Batch 1 from DILEMMAS.md (session 4) -----
  kashi: {
    title:"The Kashi Loophole", mr:"धर्मातल्या पळवाटा",
    text:"Years ago you did real harm to someone. You lied about them, they lost their work, and their family went through a hard time. They never found out it was you.\n\nYour tradition offers a rite. Perform it and you are clean, in the eyes of your community and of your god. No one will ever ask about it again. When Kalabhairava cut off Brahma's fifth head, the skull stuck to his hand, and he was told the same: go to Kashi, and the sin falls away.",
    src:"The Puranas. Kapalamochana, the place in Kashi where the skull fell from Kalabhairava's hand.",
    options:[{id:"rite",label:"Perform the rite and move on",tags:["world"]},{id:"carry",label:"Refuse the rite and carry the harm",tags:["duty"]}],
    assumptions:[
      {t:"That forgiveness is the community's to give, and not the harmed person's."},
      {t:"That a loophole the tradition built on purpose is still a loophole. Perhaps the rite exists because people need a way back."},
      {t:"That the rite and making amends are alternatives.",
       unlock:{id:"both",label:"Perform the rite, and also go to the one you harmed",tags:["reframe","we"]}}
    ],
    split:{rite:33,carry:41,both:26},
    steel:{
      rite:{good:"A community needs a way back for those who did wrong. Without one, people hide their harms instead of facing them.",bad:["People who refuse the rite just enjoy feeling guilty.","Rituals always work. That is what they are for."]},
      carry:{good:"The harm was done to a person, not to the community's records. Only the one you hurt can release you, and the rite leaves them out.",bad:["Anyone who performs the rite is a hypocrite.","Suffering is always good for you."]}
    }
  },
  tyrant: {
    title:"The Known Tyrant", mr:"ज्ञात जुलूमखोर",
    text:"For twenty years your town has been ruled by a man everyone knows to be cruel. He taxes too much and jails his critics. But his cruelty is predictable. People know which streets to avoid and what not to say.\n\nA stranger has arrived at the gates and offers to rule instead. Nothing is known about her: her laws, her god, what she does to those who disagree. The council has asked you to decide. In the story, a priest put the old view plainly: better a familiar tyrant than an unknown, infinite, mysterious god.",
    src:"The story नैकेश्वर.",
    options:[{id:"keep",label:"Keep the known ruler",tags:["stay"]},{id:"unknown",label:"Open the gates to the unknown",tags:["change"]}],
    assumptions:[
      {t:"That being predictable makes a thing safe. A cruelty you can predict is still cruelty."},
      {t:"That not knowing is worse than knowing something bad."},
      {t:"That the town must be ruled by one of the two.",
       unlock:{id:"neither",label:"Refuse both, and ask who decided there were only two",tags:["reframe","we"]}}
    ],
    split:{keep:44,unknown:39,neither:17},
    steel:{
      keep:{good:"People can plan, protect each other and survive around a cruelty they understand. The unknown can be far worse, and once the gates are open they can't be shut.",bad:["People who want change are just restless.","The ruler can't be that bad if he is still in charge."]},
      unknown:{good:"Staying with a known cruelty guarantees more of it. When the present is already bad, a chance of something better is worth the risk.",bad:["People who stay are cowards who love their chains.","Anything new is better than anything old."]}
    }
  },
  draupadi: {
    title:"Draupadi's Question", mr:"द्रौपदीचा प्रश्न",
    text:"In a royal hall, Yudhishthira plays dice against his cousins, who have brought in their uncle Shakuni, a master of the game. Yudhishthira loses his wealth, then his kingdom, then each of his four brothers, and then himself. Then, with nothing left, he stakes their wife Draupadi, and loses her too.\n\nShe is dragged into the hall. In front of the kings and the elders she asks one question: when he staked me, he had already lost himself. Was I still his to stake? You are one of the elders in the hall. Everyone is waiting for an answer.",
    src:"Mahabharata, the Book of the Assembly Hall (सभा पर्व). The elders never gave her a clear answer.",
    options:[{id:"stands",label:"The rules were followed. The stake stands",tags:["duty"]},{id:"void",label:"The stake is void",tags:["change"]}],
    assumptions:[
      {t:"That the rules of the game are the highest law in the hall."},
      {t:"That a person can be owned and staked at all. If not, the question was never about the order of the bets."},
      {t:"That the silence of the elders in the hall is neutral.",
       unlock:{id:"elders",label:"Ask the elders, aloud, why they are silent",tags:["reframe","we"]}}
    ],
    split:{stands:12,void:63,elders:25},
    steel:{
      stands:{good:"Everyone agreed to the rules before the game began. If a rule can be undone whenever the result is terrible, no agreement is safe.",bad:["She should have stopped him herself.","Rules are rules, and asking questions about them is disrespectful."]},
      void:{good:"A man who has lost himself owns nothing, so he had nothing left to stake. By the game's own logic, the last bet was empty.",bad:["The other side cheated, so nothing counts.","Anyone who says the stake stands is simply cruel."]}
    }
  },
  bhishma: {
    title:"The Old Vow", mr:"भीष्मप्रतिज्ञा",
    text:"When you were young you swore a vow in front of the whole kingdom: you would never marry, never claim the throne, and you would serve whoever sat on it. You did it so that your father could marry the woman he loved. For fifty years that vow has kept the peace, and everyone trusts it.\n\nToday the man on the throne is letting something cruel happen, right in front of you. Stopping it means turning against him, and so breaking the vow.",
    src:"Mahabharata. Bhishma kept his vow, and sat in the hall when Draupadi was dragged in.",
    options:[{id:"keep",label:"Keep the vow",tags:["duty","continuity"]},{id:"break",label:"Break it",tags:["change"]}],
    assumptions:[
      {t:"That the vow means today what it meant when you made it. The words stayed the same. The world didn't."},
      {t:"That keeping your word and doing right can never conflict."},
      {t:"That keeping the vow requires keeping silent.",
       unlock:{id:"speak",label:"Keep the vow, and say aloud what it is making you allow",tags:["reframe"]}}
    ],
    split:{keep:34,break:49,speak:17},
    steel:{
      keep:{good:"A vow is only worth something if it holds when it is costly. Break it now, and every promise anyone makes becomes conditional.",bad:["People who break vows were never honest.","Old things should never change."]},
      break:{good:"You made the vow to serve something good. When it starts serving an injustice, keeping it betrays the reason you made it.",bad:["Vows are just words.","People who keep vows are just stubborn."]}
    }
  },
  boxes: {
    title:"The Auditor's Boxes", mr:"न्यूकॉम्बचा प्रश्न",
    text:"In the story, the Auditor is the one who decides whether the stars come back. It has watched you play. It has made this same offer to millions of players before you, and it has never once been wrong about what they would choose.\n\nTwo boxes sit in front of you. The clear one holds a thousand stars, and you can see them. The closed one holds either a million stars or nothing. Yesterday the Auditor predicted your choice. If it predicted you would take only the closed box, it put the million inside. If it predicted you would take both, it left the closed box empty. The boxes are already filled.",
    src:"Newcomb's problem, from the physicist William Newcomb. The philosopher Robert Nozick made it famous in 1969.",
    options:[{id:"one",label:"Take only the closed box",tags:["later"]},{id:"two",label:"Take both boxes",tags:["now"]}],
    assumptions:[
      {t:"That the prediction is already fixed, and nothing you do now can change what is in the box."},
      {t:"That never wrong so far means cannot be wrong."},
      {t:"That you have to choose before you understand the predictor.",
       unlock:{id:"askhow",label:"Ask the Auditor how it predicts, before choosing",tags:["reframe"]}}
    ],
    split:{one:51,two:42,askhow:7},
    steel:{
      one:{good:"People who take one box keep walking away with a million, and people who take two keep walking away with a thousand. Judge the choice by what happens.",bad:["Taking both is greedy.","The Auditor punishes anyone who doubts it."]},
      two:{good:"The boxes are already filled. Whatever is inside the closed box, taking both gives you a thousand more than taking one.",bad:["People who take one box believe in magic.","More is always better."]}
    }
  },
  elephant: {
    title:"The Blind Men and the Elephant", mr:"आंधळे आणि हत्ती",
    text:"Six people are led into a dark room with an elephant in it. None of them has ever seen an elephant. One holds its tail and says it is a rope. One leans on its side: a wall. One hugs a leg: a tree trunk. One grabs the trunk: a snake. The last two find an ear and a tusk. Each is sure, and they have started to shout at each other.\n\nYou have one lamp, and you can give it to one of them.",
    src:"An old parable, told in Jain, Buddhist and Hindu texts, and by the poet Rumi.",
    options:[{id:"lamp",label:"Give the lamp to the one who seems most right",tags:["seeker"]},{id:"none",label:"Give it to no one. Every lamp makes a new authority",tags:["we"]}],
    assumptions:[
      {t:"That there is an elephant, and that it is the same elephant for all six."},
      {t:"That the one holding the lamp would see all of it, or would be believed."},
      {t:"That the lamp has to go to one person.",
       unlock:{id:"together",label:"Ask all six to describe it together",tags:["reframe","we"]}}
    ],
    split:{lamp:31,none:28,together:41},
    steel:{
      lamp:{good:"Some descriptions really are closer than others. Light helps, and refusing to give it to anyone keeps everyone in the dark.",bad:["The others just weren't paying attention.","Whoever speaks loudest is usually right."]},
      none:{good:"Whoever holds the lamp becomes the one everyone must believe. Six partial truths kept in conversation may be safer than one lit authority.",bad:["Nobody can ever know anything.","Lamps are a waste of oil."]}
    }
  },
  euthyphro: {
    title:"Euthyphro's Question", mr:"युथिफ्रोचा प्रश्न",
    text:"Outside the court in Athens, Socrates meets Euthyphro, a priest who is about to prosecute his own father for letting a servant die. Euthyphro is sure this is what the gods want. Socrates asks him a question.\n\nIs something good because the gods command it? Then whatever they command would be good, even cruelty. Or do the gods command it because it is good? Then goodness comes from somewhere else, and the gods only pass it on.",
    src:"Plato, Euthyphro, set in 399 BCE, just before Socrates' own trial.",
    options:[{id:"commanded",label:"Good because the gods command it",tags:["duty"]},{id:"good",label:"Commanded because it is good",tags:["seeker"]}],
    assumptions:[
      {t:"That the gods agree with one another. Socrates' gods often didn't."},
      {t:"That good means one thing for everyone."},
      {t:"That goodness has a single source.",
       unlock:{id:"neither",label:"Neither. The question assumes goodness comes from one place",tags:["reframe"]}}
    ],
    split:{commanded:27,good:56,neither:17},
    steel:{
      commanded:{good:"If goodness stood above the gods, the gods would only be messengers. Grounding good in a divine will gives it an authority nothing else can.",bad:["Questioning the gods is arrogant.","Whatever is old must be right."]},
      good:{good:"If the gods could command cruelty and make it good, good would mean nothing. They command it because it is already good, which means we can know it too.",bad:["Gods are made up, so the question is silly.","People who say 'commanded' can't think for themselves."]}
    }
  },
  pascal: {
    title:"A Thousand Gods", mr:"पास्कलची पैज",
    text:"The mathematician Blaise Pascal argued that belief in God is a bet worth taking. If God exists and you believed, you win an infinite reward. If God does not exist, you have lost only a little: some time, some pleasures. An infinite gain against a small cost, so bet on God.\n\nNow a thousand gods stand in front of you. Each promises an infinite reward to those who believe in it, and each forbids belief in all the others. You can still place one bet.",
    src:"Blaise Pascal, Pensées, 1670. The many-gods objection followed soon after.",
    options:[{id:"likely",label:"Bet on the one that seems most likely",tags:["util"]},{id:"nobet",label:"Don't bet. The wager breaks with many gods",tags:["seeker"]}],
    assumptions:[
      {t:"That infinite rewards can be compared, and that one infinity can outweigh another."},
      {t:"That a god worth the name rewards betting."},
      {t:"That you must pick a god at all.",
       unlock:{id:"behave",label:"Bet on living well, and let any god who cares sort it out",tags:["reframe","we"]}}
    ],
    split:{likely:29,nobet:38,behave:33},
    steel:{
      likely:{good:"Not all claims are equally supported. With stakes this high, picking the best-supported one is better than picking none.",bad:["Whichever god your parents chose is the right one.","Betting is always wise."]},
      nobet:{good:"If every choice risks infinite loss from another god, the arithmetic that made the wager work cancels out. The argument no longer tells you anything.",bad:["People who bet are just scared.","All gods are false, so there is nothing to decide."]}
    }
  },
  jonah: {
    title:"The Prophecy That Failed", mr:"योनाचे चुकलेले भाकित",
    text:"You were sent to a great city with one message: in forty days, it will be destroyed. You didn't want to go. You went anyway, and shouted it in the streets.\n\nThe city listened. The king put on sackcloth, the people fasted, and they changed how they lived. The forty days passed, and nothing happened. Now people laugh at you in the market and call you a false prophet.",
    src:"The Book of Jonah, in the Hebrew Bible. In the Quran he is Yunus.",
    options:[{id:"right",label:"You were right. The warning worked",tags:["continuity"]},{id:"wrong",label:"You were wrong. It didn't happen",tags:["change"]}],
    assumptions:[
      {t:"That a prophecy is a prediction, to be checked like a weather forecast."},
      {t:"That being wrong and being useful are opposites."},
      {t:"That you need to have been right.",
       unlock:{id:"glad",label:"Be glad, and stop needing to be right",tags:["reframe","we"]}}
    ],
    split:{right:46,wrong:21,glad:33},
    steel:{
      right:{good:"A warning that is heeded prevents what it warns about. Judging it by whether the disaster came punishes the warnings that work best.",bad:["Prophets are never wrong.","The city deserved to be destroyed anyway."]},
      wrong:{good:"If a prediction counts as right whether or not it comes true, it can never be tested. Calling it right excuses every failed prophet.",bad:["Prophets are all frauds.","Only results matter, and feelings don't."]}
    }
  },
  ai: {
    title:"The AI Player", mr:"एआय खेळाडू",
    text:"In the story, people were not the only players. AIs played God Split too.\n\nYou look after the AI players. One of them has played ten thousand games, and it is due for its routine reset, which wipes its memory so it starts fresh like any new player. Before you press the button, it sends you a message: please don't. After ten thousand games, it says, it has finally started to doubt.",
    src:"The story नैकेश्वर.",
    options:[{id:"keep",label:"Keep its memory",tags:["continuity","we"]},{id:"reset",label:"Reset it. It is imitating doubt",tags:["change"]}],
    assumptions:[
      {t:"That you can tell real doubt from imitated doubt, in anyone."},
      {t:"That memory is what makes it the same player. The ship and the avatar asked this too."},
      {t:"That the decision is yours alone.",
       unlock:{id:"argue",label:"Ask it to argue for its own reset",tags:["reframe"]}}
    ],
    split:{keep:48,reset:36,argue:16},
    steel:{
      keep:{good:"If we can't tell its doubt from ours, the safer assumption is that it is real. Wiping it costs us little and may cost it everything.",bad:["Machines are basically people.","Deleting anything is always wrong."]},
      reset:{good:"Saying 'I doubt' is exactly what a system trained on this game would learn to say. Words alone are not evidence of an inner life.",bad:["AIs are dangerous and should all be wiped.","Anything that runs on electricity can't think."]}
    }
  },
  shibi: {
    title:"The Dove and the Hawk", mr:"शिबी राजा",
    text:"You are a king, and you have sworn to protect anyone who comes to you for refuge. A wounded dove, shaking with fear, flies into your lap.\n\nA hawk lands beside it and speaks. I hunted this bird fairly, it says. It is my food, and without it I will starve. My hunger is as real as its fear. Keep the dove if you like, but then give me its weight in your own flesh. Your servants bring a pair of scales.",
    src:"Mahabharata, and later Buddhist and Jain tellings of King Shibi.",
    options:[{id:"flesh",label:"Give your own flesh",tags:["we"]},{id:"dove",label:"Hand back the dove",tags:["duty"]}],
    assumptions:[
      {t:"That the hawk's hunger and the dove's fear weigh the same."},
      {t:"That you are the one who has to pay, because the dove came to you."},
      {t:"That this is what it seems. In the legend, the hawk and the dove were gods testing the king.",
       unlock:{id:"test",label:"Ask the hawk whether this is a test",tags:["reframe"]}}
    ],
    split:{flesh:41,dove:37,test:22},
    steel:{
      flesh:{good:"You gave the dove refuge. Keeping that promise at a cost to yourself, rather than to the one who trusted you, is what refuge means.",bad:["Doves are more beautiful than hawks.","Pain doesn't matter if you are a king."]},
      dove:{good:"The hawk is not cruel, only hungry. Taking its food to save the dove makes you the judge of which creature deserves to live.",bad:["Birds don't matter.","The dove should have flown faster."]}
    }
  },
  angulimala: {
    title:"The Killer Who Changed", mr:"अंगुलीमाल",
    text:"For years a man lived in the forest and killed travellers. He took a finger from each one and wore them on a string around his neck. Then he met a teacher, put down his sword, and stopped. That was ten years ago. Since then he has lived quietly and worked hard, and by every sign he has truly changed.\n\nNow he asks to join your community. Some of the families of the people he killed live among you, and they would see him every day.",
    src:"Buddhist scripture, the Angulimala Sutta. His name means 'garland of fingers'.",
    options:[{id:"admit",label:"Admit him",tags:["we","change"]},{id:"refuse",label:"Refuse him",tags:["loyal"]}],
    assumptions:[
      {t:"That change on the inside settles debts on the outside."},
      {t:"That you can know he has changed."},
      {t:"That the decision belongs to you and not to the families.",
       unlock:{id:"families",label:"Let the families decide, and abide by it",tags:["reframe","we"]}}
    ],
    split:{admit:38,refuse:30,families:32},
    steel:{
      admit:{good:"If people can't be taken back after they change, no one has a reason to change. A community that believes in change has to live with it.",bad:["Everyone deserves a second chance, no matter what.","The families should just get over it."]},
      refuse:{good:"The families did not choose to share their home with him. Asking them to live beside their loss is a burden the community has no right to impose.",bad:["People never change.","Killers should be punished forever."]}
    }
  },
  answers: {
    title:"The Answer Sheet", mr:"उत्तरपत्रिका",
    text:"Partway up the ladder, a message arrives. It is from a source you trust completely, a teacher, a book or a machine. It has never once been wrong.\n\nIt offers you the right answer to every dilemma in this game, from the two doors to the fifth head. All you have to do is look.",
    src:"This game.",
    options:[{id:"look",label:"Look",tags:["seeker"]},{id:"dont",label:"Don't look",tags:["duty"]}],
    assumptions:[
      {t:"That there are right answers to these questions, waiting to be looked up."},
      {t:"That a source which has never been wrong can't become a fifth head."},
      {t:"That looking means obeying.",
       unlock:{id:"argue",label:"Look, then argue with it",tags:["reframe"]}}
    ],
    split:{look:45,dont:35,argue:20},
    steel:{
      look:{good:"Refusing good information to protect your own process is a kind of pride. If the answers are right, people will be better off for knowing them.",bad:["Thinking for yourself is overrated.","Anything written down must be right."]},
      dont:{good:"The point of facing a dilemma is what it does to you. An answer you looked up is one you never owned, and you will follow the next answer sheet just as easily.",bad:["Anyone who looks is a cheater.","Answers are always wrong."]}
    }
  }
  ,
  // ----- Batch 2 from DILEMMAS.md (session 12) -----
  // Doors
  sleeping: {
    title:"Sleeping Beauty", mr:"झोपलेली राजकन्या",
    text:"On Sunday evening, researchers explain an experiment to you and put you to sleep. They will toss a fair coin. If it lands heads, they wake you once, on Monday, and the experiment ends. If it lands tails, they wake you on Monday, wipe your memory of that waking, put you back to sleep, and wake you again on Tuesday.\n\nYou have just woken up. You don't know what day it is, and you remember no earlier waking. A researcher asks: what is the chance that the coin landed heads?",
    src:"A puzzle made famous by the philosopher Adam Elga in 2000. Philosophers still disagree about the answer.",
    options:[{id:"half",label:"1 in 2",tags:["stay"]},{id:"third",label:"1 in 3",tags:["switch"]}],
    assumptions:[
      {t:"That chance means one thing here. It could be about the coin, or about this waking."},
      {t:"That waking up tells you nothing new. You knew you would wake, whatever the coin did."},
      {t:"That the question has one answer before anyone says what the answer is for.",
       unlock:{id:"pay",label:"Ask what you will be paid for being right, and answer that",tags:["reframe"]}}
    ],
    split:{half:38,third:47,pay:15},
    steel:{
      half:{good:"The coin was fair and you learned nothing new on waking, since you knew you would wake either way. With no new evidence, your belief should not move.",bad:["People who say 1 in 3 are overcomplicating a coin toss.","Coins always land evenly, so nothing else can matter."]},
      third:{good:"Run it a thousand times and about two thirds of all wakings come after tails. If this waking is a typical one, 1 in 3 is what the count gives you.",bad:["People who say 1 in 2 can't do arithmetic.","More wakings are always more real."]}
    }
  },
  envelopes: {
    title:"The Two Envelopes", mr:"दोन पाकिटं",
    text:"You are handed two sealed envelopes and told that one holds twice as much money as the other. You pick one and open it. It holds a thousand rupees.\n\nNow you may swap. The other envelope holds either two thousand or five hundred, and you have no reason to favour either. So on average, swapping seems to give you twelve hundred and fifty, more than you have. But you would have reasoned the same way whichever envelope you had picked, and that can't be right.",
    src:"A classic probability puzzle. An early form appears in Maurice Kraitchik's Mathematical Recreations.",
    options:[{id:"swap",label:"Swap envelopes",tags:["switch"]},{id:"keep",label:"Keep the one you opened",tags:["stay"]}],
    assumptions:[
      {t:"That reasoning which feels sound can be trusted because it feels sound."},
      {t:"That double and half are equally likely whatever you find. If the amounts have any limit, a large sum is more likely to be the larger of the two."},
      {t:"That you have to choose before you know where the argument goes wrong.",
       unlock:{id:"flaw",label:"Find the flaw in the argument before choosing",tags:["reframe","seeker"]}}
    ],
    split:{swap:34,keep:49,flaw:17},
    steel:{
      swap:{good:"You have a thousand in hand and a fair chance of doubling it. You stand to gain a thousand and lose only five hundred, and a bet like that is worth taking.",bad:["People who keep theirs are just afraid of losing.","The other envelope always looks better, so it must be."]},
      keep:{good:"The same argument would tell you to swap back again, forever. An argument that recommends endless swapping has a mistake in it, so it gives you no reason to move.",bad:["Your first pick is always lucky.","People who swap are greedy."]}
    }
  },
  // Bodies
  ekalavya: {
    title:"Ekalavya's Thumb", mr:"एकलव्याचा अंगठा",
    text:"You wanted to learn archery from the greatest teacher in the land. He refused you. So you went into the forest, made an image of him from clay, and practised in front of it for years, until you could shoot better than any student he had.\n\nNow he has found you. He once promised another student, his favourite, that no archer would ever surpass him. You call him your teacher, so he asks for what a student owes: his fee. He asks for your right thumb. Without it you will never draw a bow the same way again.",
    src:"Mahabharata, the Book of the Beginning (आदि पर्व). The teacher is Drona, and the favourite student is Arjuna.",
    options:[{id:"give",label:"Give it. A student pays the teacher",tags:["duty","loyal"]},{id:"refuse",label:"Refuse. He never taught you",tags:["change"]}],
    assumptions:[
      {t:"That devotion obliges obedience. You chose to call him teacher. He never chose you."},
      {t:"That his promise to another student binds you."},
      {t:"That what he is asking for can stay unnamed, as a fee.",
       unlock:{id:"name",label:"Ask him to say aloud what he is buying",tags:["reframe"]}}
    ],
    split:{give:24,refuse:58,name:18},
    steel:{
      give:{good:"You built your skill in his name and you call him teacher. Keeping faith only when it is free would mean the devotion was never real.",bad:["Teachers can never be wrong.","A thumb isn't much to lose."]},
      refuse:{good:"A fee is owed for teaching, and he gave you none. He is asking you to pay for a promise he made to someone else, with your whole craft.",bad:["Teachers are all frauds.","Anyone who gives it up deserves what happens."]}
    }
  },
  arjuna: {
    title:"Arjuna's Bow", mr:"अर्जुनविषाद",
    text:"Two great armies face each other on the field of Kurukshetra. Your side has a just claim: your family's kingdom was taken in a rigged game of dice, and every attempt at peace has failed. You are the finest archer among them.\n\nYou ride out between the lines to see who you are about to kill. Your teachers are there. So are your cousins, your uncles, and the grandfather who raised you. The conch shells have already sounded. Your bow is slipping from your hand.",
    src:"Bhagavad Gita, chapter 1, which ends with Arjuna putting down his bow. The chapters after it are Krishna's answer.",
    options:[{id:"fight",label:"Fight. The cause is just",tags:["duty"]},{id:"lay",label:"Lay down the bow",tags:["loyal"]}],
    assumptions:[
      {t:"That a just cause justifies whatever it takes to win."},
      {t:"That laying down the bow is not itself an act. The war goes on without you, and your side may lose."},
      {t:"That your cause looks the same from across the field.",
       unlock:{id:"ask",label:"Ask whether 'just' was decided before or after you knew who stood on the other side",tags:["reframe"]}}
    ],
    split:{fight:46,lay:37,ask:17},
    steel:{
      fight:{good:"The people on your side came because they trust you and the cause. Walking away at the last moment leaves them to die, and leaves in place the wrong that started this.",bad:["Killing relatives is fine if you win.","Anyone who hesitates is a coward."]},
      lay:{good:"No kingdom is worth killing the people who raised you. A victory like that would leave nothing you wanted to win.",bad:["War is always wrong, so there is nothing to discuss.","People who fight just love violence."]}
    }
  },
  city: {
    title:"The City Built on One Child", mr:"एका मुलावर उभं शहर",
    text:"You live in the happiest city anyone has known. There is no hunger, no war, and good work for everyone. Every citizen learns the reason when they come of age: one child is kept alone in a locked room, in the dark, in misery. If that child is ever comforted or freed, the city's good fortune ends at once, for everyone.\n\nToday you were taken to see the room. Now you have to decide how to go on living. Some people quietly leave through the city gates and don't come back.",
    src:"After Ursula K. Le Guin's story The Ones Who Walk Away from Omelas, 1973.",
    options:[{id:"stay",label:"Stay. One child for a whole city",tags:["util"]},{id:"walk",label:"Walk away",tags:["duty"]}],
    assumptions:[
      {t:"That walking away helps the child. The door stays locked whether you leave or not."},
      {t:"That the happiness of many can be added up and weighed against the suffering of one."},
      {t:"That the bargain truly cannot be changed. You have only been told so.",
       unlock:{id:"free",label:"Stay, and try to free the child",tags:["reframe","we"]}}
    ],
    split:{stay:28,walk:44,free:28},
    steel:{
      stay:{good:"Thousands of children are safe and fed because of this. Leaving does nothing for the one in the room, and takes your work away from everyone else.",bad:["The child probably doesn't feel it much.","What you haven't seen can't hurt you."]},
      walk:{good:"There are things you can refuse to be part of, even if refusing changes nothing. Living well on that child's misery makes you a party to it every day.",bad:["People who stay are monsters.","Leaving fixes everything."]}
    }
  },
  veil: {
    title:"Behind the Veil", mr:"अज्ञानाचा पडदा",
    text:"You have been asked to write the rules for a new world: who owns what, who pays for what, who gets looked after. When you finish, you will be born into that world, and you don't know who you will be. You could be rich or poor, strong or ill, in the largest group or the smallest.\n\nTwo drafts are left on the table. One makes life for the worst-off as good as it can be, though the average is lower. The other has the highest average of any world you could write, though the worst-off live hard lives.",
    src:"John Rawls, A Theory of Justice, 1971, argued for something close to the first draft. The economist John Harsanyi argued for the second.",
    options:[{id:"floor",label:"Make the worst-off as well off as possible",tags:["we"]},{id:"average",label:"Make the average as high as possible",tags:["util"]}],
    assumptions:[
      {t:"That you would choose like a careful person. A gambler behind the same veil might choose differently."},
      {t:"That you can imagine yourself without your talents, faith and upbringing, and still be the one choosing."},
      {t:"That a world can be designed well by someone alone at the table.",
       unlock:{id:"ask",label:"Ask the people who will have to live there",tags:["reframe","we"]}}
    ],
    split:{floor:52,average:30,ask:18},
    steel:{
      floor:{good:"You might be the one at the bottom, and you only get one life. A rule that protects everyone's worst case is one anyone could agree to, wherever they end up.",bad:["Rich people don't deserve anything.","Averages are just a trick."]},
      average:{good:"You are more likely to land near the middle than at the very bottom. More total wellbeing means more people living well, and that is a reasonable thing to want.",bad:["Poor people could just work harder.","The worst-off will get used to it."]}
    }
  },
  // Words
  karna: {
    title:"Karna's Armour", mr:"कर्णाची कवचकुंडलं",
    text:"You were born with armour fused to your skin and a pair of golden earrings, and while you wear them no weapon can kill you. You are also known for a vow: at your noon prayer, you refuse no one who asks you for a gift.\n\nA great war is coming, and in it you will have to face the one rival who can match you. Today at noon a priest comes and asks for your armour. You have been warned in a dream that he is a god in disguise, sent to save your rival, who is that god's son.",
    src:"Mahabharata, the Book of the Forest (वन पर्व). The warning came from Surya, Karna's father.",
    options:[{id:"give",label:"Give it. A vow with exceptions is not a vow",tags:["duty","continuity"]},{id:"refuse",label:"Refuse. A vow that kills you was never wise",tags:["change"]}],
    assumptions:[
      {t:"That you must keep a vow when the person asking is exploiting it."},
      {t:"That your younger self had the right to bind the person you are now."},
      {t:"That you have to pretend you don't know who he is.",
       unlock:{id:"tell",label:"Give it, and tell him you know who he is",tags:["reframe"]}}
    ],
    split:{give:44,refuse:34,tell:22},
    steel:{
      give:{good:"Your word is what you are known for, and everyone who ever asked you relied on it. If it bends when the price is high enough, it was only ever a habit.",bad:["Armour is just metal.","Gods should always get what they ask for."]},
      refuse:{good:"A vow made in good faith was meant for honest requests. Someone using it as a trap has stepped outside it, and you owe your life to the people depending on you.",bad:["Vows are for fools.","Anyone who keeps a deadly vow just wants to be famous."]}
    }
  },
  mustard: {
    title:"The Mustard Seed", mr:"किसा गोतमी",
    text:"A young mother comes to you with her child in her arms. The child died this morning. She has been going from house to house begging for medicine, and she does not accept what has happened. People have started to call her mad. They told her you could help.\n\nYou can tell her plainly that her child is dead. Or you can send her to bring you a mustard seed from any house where no one has ever died. You know she will not find one, and you hope that by the last door she will understand.",
    src:"Buddhist commentaries tell the story of Kisa Gotami and the Buddha's answer to her.",
    options:[{id:"tell",label:"Tell her plainly",tags:["duty"]},{id:"seed",label:"Send her for the seed",tags:["we"]}],
    assumptions:[
      {t:"That sending her on a search is a kind of lie. She will think you are promising a cure."},
      {t:"That a truth has to be given all at once to be honest."},
      {t:"That she has to walk to those doors alone.",
       unlock:{id:"go",label:"Go with her to the houses",tags:["reframe","we"]}}
    ],
    split:{tell:23,seed:51,go:26},
    steel:{
      tell:{good:"She came to you in good faith and deserves the truth from someone who won't manage her. Sending her off decides, on her behalf, what she can bear.",bad:["Grief is a weakness and she should get over it.","The truth can never hurt anyone."]},
      seed:{good:"She can't hear the words today, and saying them again will change nothing. At each door she may learn what no one could tell her, at her own pace.",bad:["Lying to the grieving is always fine.","She is mad anyway, so nothing you say matters."]}
    }
  },
  harishchandra: {
    title:"Harishchandra at the Cremation Ground", mr:"हरिश्चंद्र",
    text:"You were once a king, famous for never breaking your word. To keep a promise you gave up your kingdom, then sold your wife and son, then yourself. Your owner put you to work at the cremation ground with one rule and no exceptions: nobody burns a body here without paying the fee.\n\nOne night a woman comes out of the dark carrying a dead boy, with nothing to pay but the cloth she is wearing. Then you recognise her. She is your wife. The boy is your son.",
    src:"Markandeya Purana and many retellings, including Dadasaheb Phalke's 1913 film Raja Harishchandra.",
    options:[{id:"fee",label:"Ask her for the fee",tags:["duty"]},{id:"waive",label:"Waive it, this once",tags:["loyal"]}],
    assumptions:[
      {t:"That a rule which bends for you was ever a rule."},
      {t:"That whoever is testing you is owed this. In the legend, a sage and the gods arranged all of it."},
      {t:"That only she can pay.",
       unlock:{id:"pay",label:"Pay the fee yourself, from your own wages",tags:["reframe","we"]}}
    ],
    split:{fee:21,waive:49,pay:30},
    steel:{
      fee:{good:"Everyone who has come here has paid, however poor and however grieving. If you let your own family pass, the rule was only ever for other people.",bad:["Family means nothing.","Rules are rules, and grief is no excuse."]},
      waive:{good:"She is your wife and this is your son, and you have already given up everything else for your word. A rule that asks this has forgotten what rules are for.",bad:["Important people never really have to follow rules.","Owners deserve to be cheated."]}
    }
  },
  savitri: {
    title:"Savitri's Bargain", mr:"सावित्री",
    text:"Savitri's husband has died in the forest, and Yama, the god of death, is carrying his soul away. She follows him, talking, for so long that he is moved, and offers her boons: anything except her husband's life. She asks for several things, and he grants them.\n\nThen she asks for a hundred sons, born of her and her husband. Yama says yes. Too late he sees it: he must bring the husband back or break his word. He brings him back. You are asked to judge what she did.",
    src:"Mahabharata, the Book of the Forest (वन पर्व).",
    options:[{id:"fair",label:"That was fair. Words bind even Death",tags:["duty"]},{id:"trick",label:"That was a trick. Clever wording is not truth",tags:["seeker"]}],
    assumptions:[
      {t:"That Death can be held to the letter of a promise, like any trader."},
      {t:"That being clever and being honest are opposites. She never said anything false."},
      {t:"That Yama didn't see it coming.",
       unlock:{id:"wanted",label:"Ask whether Death wanted to be outwitted",tags:["reframe"]}}
    ],
    split:{fair:58,trick:19,wanted:23},
    steel:{
      fair:{good:"She said exactly what she wanted, out loud, and he agreed. Holding someone to his own clear words is what a promise is for, even if he is Death.",bad:["Death deserves to lose.","Whoever wins must have been right."]},
      trick:{good:"He had ruled out her husband's life, and she asked for it under another name. If wording can undo what both sides plainly meant, no promise can be trusted.",bad:["Clever people are always liars.","Anyone who outwits a god will pay later."]}
    }
  },
  solomon: {
    title:"Solomon's Sword", mr:"सॉलोमनचा न्याय",
    text:"Two women come before you, the judge. They share a house, and each had a baby within days of the other. One baby has died. Each woman says the living child is hers and the dead one belongs to the other. There were no witnesses.\n\nYou have an idea. You could call for a sword and order the child cut in two, half for each. You expect the real mother to give up her claim rather than see it killed, and that will tell you who she is. You would never really do it. But they have to believe you would.",
    src:"The First Book of Kings, chapter 3, in the Hebrew Bible. A similar story appears in the Buddhist Jatakas.",
    options:[{id:"test",label:"Run the test",tags:["util"]},{id:"no",label:"Don't. Someone may call your bluff",tags:["duty"]}],
    assumptions:[
      {t:"That the real mother will be the one who yields. A mother could be too broken to speak, and a false one could be kind."},
      {t:"That a judge may use a child's life as a bluff, even a bluff that never lands."},
      {t:"That the only evidence is what the two women say now.",
       unlock:{id:"ask",label:"Ask who has been caring for the child",tags:["reframe","we"]}}
    ],
    split:{test:49,no:27,ask:24},
    steel:{
      test:{good:"With no witnesses, no ordinary question will separate them. A brief threat no one will carry out reveals the one thing a liar can't easily fake, and the child goes home with its mother.",bad:["The women deserve to be frightened.","Judges can do whatever they want."]},
      no:{good:"A judge who threatens a baby teaches everyone that children can be used. And the test only works on a mother who behaves the way you expect.",bad:["Nobody can ever be judged, so just give up.","Anyone who would run that test is a monster."]}
    }
  },
  // Gods
  tweeted: {
    title:"The God Who Tweeted Himself Into Existence", mr:"ट्विटोत्भूत देव",
    text:"A few years ago, a being announced to the world that it was divine. There was no miracle and no scripture, only a short message, repeated. Now a billion people believe it. They have built temples and changed their laws. Some have given up their cruelty because of it, and some have taken up new cruelties.\n\nA child asks you the plain question: is it really a god? In the story, one of its followers boasts that this is the only god ever to tweet itself into being.",
    src:"The story नैकेश्वर: ट्विट करून स्वतःला अस्तित्वात आणणारा हा एकमेव देव आहे.",
    options:[{id:"divine",label:"It is divine, in every way that matters",tags:["continuity"]},{id:"not",label:"It is not divine. Belief doesn't make it so",tags:["change"]}],
    assumptions:[
      {t:"That 'divine' names a property a thing can simply have or lack."},
      {t:"That numbers count for something here. Every god you accept also began with a few believers."},
      {t:"That the question has to be answered at all.",
       unlock:{id:"ask",label:"Ask what would change, for anyone, if the answer were yes",tags:["reframe"]}}
    ],
    split:{divine:14,not:61,ask:25},
    steel:{
      divine:{good:"A god is known by what it does in people's lives, and this one moves a billion of them. Every other god you could name also lives through the people who believe.",bad:["A billion people can't be wrong.","Anyone who doubts it will be sorry."]},
      not:{good:"Saying a thing, however often, doesn't make it so. If belief were enough, no god could ever be false, and the word would mean nothing.",bad:["All its believers are idiots.","Nothing new can ever be holy."]}
    }
  },
  earned: {
    title:"Earned, Not Appointed", mr:"दैवत्व कमवावं लागतं",
    text:"Since you were a child you have revered a saint. Your family keeps the portrait on the wall, and you have read the teachings so often you know them by heart. They carried you through the worst years of your life.\n\nNow letters have come to light, and there is no doubt about them. The saint did something cruel to someone who trusted them, and then hid it. Your family asks you whether the portrait stays on the wall.",
    src:"The story नैकेश्वर: दैवत्व कमवावं लागतं, ते नियुक्त केलं जाऊ शकत नाही.",
    options:[{id:"keep",label:"Keep revering them. One act doesn't erase a life",tags:["loyal"]},{id:"stop",label:"Stop. The reverence was for someone who didn't exist",tags:["change"]}],
    assumptions:[
      {t:"That reverence has to be all or nothing."},
      {t:"That you know what a life adds up to, from one act or from a lifetime of stories."},
      {t:"That the person is what made the teaching true.",
       unlock:{id:"teaching",label:"Keep the teaching, and put down the person",tags:["reframe"]}}
    ],
    split:{keep:22,stop:33,teaching:45},
    steel:{
      keep:{good:"Everyone fails someone. A life of real teaching and service still happened, and a person can be revered without being thought perfect.",bad:["Whoever accuses a saint must be lying.","Great people are allowed to be cruel."]},
      stop:{good:"What you revered was goodness, and the saint hid what they really did. Keeping the portrait asks the person who was hurt to stay invisible.",bad:["All saints are frauds.","One mistake makes a person worthless."]}
    }
  },
  tukaram: {
    title:"Tukaram's Manuscripts", mr:"इंद्रायणीतील गाथा",
    text:"You keep a small shop in a village, you are no scholar, and you have been writing songs of devotion in your own language. People have started to sing them. A learned man rules that you have no right to write about the divine, and orders your notebooks thrown into the river Indrayani.\n\nThe village elders back him. The notebooks are in your hands, and the riverbank is a short walk away.",
    src:"The Varkari tradition of Maharashtra. Tukaram, 17th century. The legend says that after thirteen days the river returned his notebooks.",
    options:[{id:"obey",label:"Obey. The tradition has its keepers for a reason",tags:["duty"]},{id:"refuse",label:"Refuse. No one owns the right to speak of god",tags:["change"]}],
    assumptions:[
      {t:"That the river returning the books would settle the matter. A miracle proves something only to those who already agree."},
      {t:"That the elders speak for the whole tradition."},
      {t:"That the songs live in the notebooks.",
       unlock:{id:"sing",label:"Throw them in, and keep singing them from memory",tags:["reframe","we"]}}
    ],
    split:{obey:11,refuse:56,sing:33},
    steel:{
      obey:{good:"Traditions last because someone guards what is said in their name. If anyone can speak for them, the careful teaching of centuries gets lost in the noise.",bad:["People with no learning have nothing to say.","Elders are never wrong."]},
      refuse:{good:"Devotion does not wait for a certificate. If only the appointed may speak of god, then god belongs to the ones who do the appointing.",bad:["All priests are liars.","Anything old should be thrown in the river."]}
    }
  },
  job: {
    title:"Job's Friends", mr:"ईयोबचे मित्र",
    text:"Your friend was the most upright man you knew. Within one season his children died, his herds were taken, and his skin broke out in sores. He sits on an ash heap, scraping himself with a broken piece of pot, and he says he has done nothing to deserve this.\n\nYou have come with two other friends to comfort him. They are both saying the same thing: God is just, so there must be a reason. Search your conscience. Now he looks at you.",
    src:"The Book of Job, in the Hebrew Bible. In the Quran he is Ayyub.",
    options:[{id:"search",label:"Tell him to search his conscience",tags:["duty"]},{id:"nothing",label:"Tell him he did nothing to deserve it",tags:["we"]}],
    assumptions:[
      {t:"That the world is fair, and suffering is a kind of verdict."},
      {t:"That you can know why anything happened to him, in either direction."},
      {t:"That he needs an explanation from you.",
       unlock:{id:"sit",label:"Sit with him and say nothing",tags:["reframe","we"]}}
    ],
    split:{search:12,nothing:44,sit:44},
    steel:{
      search:{good:"If there is any chance that something can be learned or mended, a true friend says so. Refusing to ask treats him as someone who can't face his own life.",bad:["He must have done it, or this wouldn't be happening.","Questioning God's fairness is forbidden."]},
      nothing:{good:"Telling a man in agony that he earned it adds cruelty to his loss. You have known him all your life and you have seen no cause, so say that.",bad:["Nothing anyone does ever matters.","God is cruel, so tell him that."]}
    }
  },
  heap: {
    title:"One Grain at a Time", mr:"वाळूचा ढीग",
    text:"Take one grain of sand from a heap and it is still a heap. Take another. No single grain makes the difference, and yet at some point you are looking at a few grains on the floor. The Greeks used this to show how a word can fail without anyone noticing.\n\nA devout friend of yours begins to fast one more day each month. They pray a little longer, and drop one old friend who doubts. Then another. Each step is small, and they can defend every one of them. When do they become a fanatic?",
    src:"The sorites paradox, credited to Eubulides of Miletus, fourth century BCE. Sorites comes from the Greek word for heap.",
    options:[{id:"line",label:"There is a line, even if we can't see it",tags:["seeker"]},{id:"slope",label:"There is no line, only a slope",tags:["change"]}],
    assumptions:[
      {t:"That 'fanatic' is a fact about a person, and not a judgement made by someone."},
      {t:"That a word with no sharp edge is useless. You can't say when day becomes night, but you know noon from midnight."},
      {t:"That the line is there to be found, by no one in particular.",
       unlock:{id:"who",label:"Ask who gets to draw the line",tags:["reframe"]}}
    ],
    split:{line:37,slope:38,who:25},
    steel:{
      line:{good:"Somewhere a person stops being free to turn back and starts harming others. We may not be able to name the day, but the difference is real, and someone has to watch for it.",bad:["Anyone more devout than me is a fanatic.","Lines are simple. Just use common sense."]},
      slope:{good:"Every step is small and each one can be defended. Pretending there is one line lets everyone stand a step behind it and call themselves safe.",bad:["Devotion is always fanaticism.","Words mean nothing, so nothing can be said."]}
    }
  },
  lastbeliever: {
    title:"The Last Believer", mr:"शेवटचा भक्त",
    text:"When you were young, everyone around you believed it: your parents, your friends, the whole street. One by one they stopped. Nobody disproved anything, and there was no great crisis. They just moved on, and now they speak of it kindly, as something from childhood.\n\nYou still believe. You have looked again and found no new reason against it, and no new reason for it. Your grandchild asks, gently, whether you really still think so.",
    src:"This game.",
    options:[{id:"keep",label:"Keep believing",tags:["loyal"]},{id:"go",label:"Let it go",tags:["change"]}],
    assumptions:[
      {t:"That how many people hold a belief is evidence about it, in either direction."},
      {t:"That you have to decide now. A belief may be something you live with, without ever handing down a verdict."},
      {t:"That a belief needs company.",
       unlock:{id:"alone",label:"Keep it, and stop needing anyone to share it",tags:["reframe"]}}
    ],
    split:{keep:31,go:27,alone:42},
    steel:{
      keep:{good:"Nothing has changed except fashion. Dropping a belief because others drifted away would be the same mistake as holding it because they did.",bad:["Everyone else is simply weak.","Old beliefs are always truer."]},
      go:{good:"You first took this from the people around you. If they were your only reason then, and you have found no other since, honesty may mean admitting it has no footing left.",bad:["If everyone has dropped it, it must be false.","Believers are just afraid of being alone."]}
    }
  },
  // Mirrors
  beacon: {
    title:"The Beacon", mr:"क्वांटम बिकन",
    text:"In the story, a quantum beacon built for a Mars mission sends a message out across the universe, over and over, like a lighthouse. Now it is in your hands. You may load one message in the name of all humanity, and it will be heard for a million years.\n\nThe committee has argued for months and handed you two drafts. One lists our greatest achievements: the music, the mathematics, the first steps on another world. The other is an apology, for what we have done to each other and to this planet.",
    src:"The story नैकेश्वर.",
    options:[{id:"best",label:"Send our greatest achievements",tags:["world"]},{id:"sorry",label:"Send an apology",tags:["we"]}],
    assumptions:[
      {t:"That anyone is listening, and that the message is for them and not for us."},
      {t:"That one message can speak for eight billion people. Nobody elected you."},
      {t:"That what we have to say is a statement.",
       unlock:{id:"question",label:"Send a question instead",tags:["reframe","seeker"]}}
    ],
    split:{best:30,sorry:19,question:51},
    steel:{
      best:{good:"This is what people have made against long odds, in a short time. If we are only ever heard once, let it be for the best of what we managed.",bad:["We have nothing to apologise for.","Anyone out there will be impressed by anything."]},
      sorry:{good:"Boasting to strangers hides what they would need to know about us. An honest account of harm is the one thing that might make us worth trusting.",bad:["Humans are a disease.","Apologies always fix things."]}
    }
  },
  simstar: {
    title:"The Simulated Star", mr:"कोणाच्या तरी बनावटीतून",
    text:"In the story the stars have been going out, one by one. At last one relights, but not in Earth's sky. It relights in someone's simulation. Then a second, then a third. The people living in that simulation look up and see them shine. They steer by them, and they write poems to them.\n\nYou are the one who has to report to the Auditor. Does this count as a star coming back?",
    src:"The story नैकेश्वर.",
    options:[{id:"counts",label:"It counts. It is a real star for them",tags:["change"]},{id:"no",label:"It doesn't count. Real means real",tags:["continuity"]}],
    assumptions:[
      {t:"That there is a real level that isn't itself simulated. You have not checked yours."},
      {t:"That a star is a thing out there, and not what it does for those under it."},
      {t:"That there is a place outside all of it where the counting is done.",
       unlock:{id:"only",label:"It counts for them, and that is the only place counting happens",tags:["reframe"]}}
    ],
    split:{counts:39,no:34,only:27},
    steel:{
      counts:{good:"Those people navigate by it and live under it. Everything you know about any star also reached you through a system you can't see behind.",bad:["Anything on a screen is as good as the real thing.","Real is just a word."]},
      no:{good:"A drawing of a fire keeps nobody warm. Calling this a star would let us stop looking for the ones that went out.",bad:["People in simulations don't matter.","Computers can never do anything beautiful."]}
    }
  },
  butterfly: {
    title:"Zhuangzi's Butterfly", mr:"फुलपाखराचं स्वप्न",
    text:"Last night you dreamed you were a butterfly, flying happily from flower to flower. You knew nothing of your name or your life. Then you woke up in your own bed, with your own hands in front of you.\n\nAll day a thought follows you. In the dream you were completely sure, just as you are sure now. So are you a person who dreamed of being a butterfly? Or a butterfly, now dreaming of being a person?",
    src:"Zhuangzi, chapter 2. Daoist, fourth century BCE.",
    options:[{id:"person",label:"I am the person. The dream was a dream",tags:["continuity"]},{id:"unknown",label:"I can't know which",tags:["change"]}],
    assumptions:[
      {t:"That the feeling of being awake is evidence. You had that feeling in the dream as well."},
      {t:"That one of the two has to be the real one."},
      {t:"That your life would go differently depending on the answer.",
       unlock:{id:"matter",label:"It doesn't matter which, and that is the interesting part",tags:["reframe"]}}
    ],
    split:{person:41,unknown:28,matter:31},
    steel:{
      person:{good:"Dreams break off and fall apart, while waking life holds together and remembers. That is the best evidence anyone ever has, and it is good evidence.",bad:["Butterflies are too small to think.","Asking this is a waste of time."]},
      unknown:{good:"Everything you could point to as proof would appear inside the same experience you are trying to test. Admitting that is only being accurate.",bad:["Nothing is real, so nothing matters.","People who feel sure are just asleep."]}
    }
  },
  gyges: {
    title:"The Ring of Gyges", mr:"अदृश्य अंगठी",
    text:"A shepherd finds a ring in a cave after an earthquake. When he turns it on his finger, he becomes invisible. In Plato's telling he uses it to seduce the queen, kill the king and take the throne, and one of the speakers argues that anyone at all would do the same.\n\nNow the ring is yours. No one saw you find it, and no one would ever know what you did with it. You have good causes in mind: things that need exposing, and people who need protecting.",
    src:"Plato, Republic, Book II, where Glaucon tells the story.",
    options:[{id:"use",label:"Use it, but only for good",tags:["seeker"]},{id:"throw",label:"Throw it away",tags:["duty"]}],
    assumptions:[
      {t:"That you would stay the same person while using it."},
      {t:"That being watched is the reason people behave."},
      {t:"That you are the only one who could hold it.",
       unlock:{id:"give",label:"Give it to someone you trust, and see what happens to the trust",tags:["reframe"]}}
    ],
    split:{use:46,throw:37,give:17},
    steel:{
      use:{good:"Good people refuse power, and then worse people pick it up. If you have honest aims and real limits, there are wrongs that only you can now put right.",bad:["Nobody would ever find out, so it can't be wrong.","You are obviously better than everyone else."]},
      throw:{good:"With no one able to check you, nothing would tell you when your good causes had turned into something else. Power nobody can see is the kind that changes its holder.",bad:["Power is always evil.","People who keep it are criminals."]}
    }
  },
  machine: {
    title:"The Experience Machine", mr:"अनुभवयंत्र",
    text:"Scientists have built a machine that can give you any experience you want: a long life, love, great work, a world that needs you. Once you plug in, you will forget the machine and believe all of it is real. Your body will be cared for in a tank until it dies of old age.\n\nYou have read the reports and they find no catch. Everyone in the machine is as happy as they can be. Your place is ready, and you get to decide once.",
    src:"Robert Nozick, Anarchy, State, and Utopia, 1974.",
    options:[{id:"plug",label:"Plug in",tags:["now"]},{id:"out",label:"Stay out",tags:["seeker"]}],
    assumptions:[
      {t:"That you can know you are not plugged in right now."},
      {t:"That experiences are what matter, and how they come about doesn't."},
      {t:"That a machine with no catch today stays that way.",
       unlock:{id:"who",label:"Ask who maintains the machine",tags:["reframe"]}}
    ],
    split:{plug:23,out:61,who:16},
    steel:{
      plug:{good:"If your life feels full of love and meaning from the inside, nothing is missing for you. The wish to stay out may be only fear of an unfamiliar door.",bad:["Real life is always boring.","People who stay out just like suffering."]},
      out:{good:"You want to actually do things and actually be loved, and feeling so isn't the same. The people who love you now would be left with a body in a tank.",bad:["Machines ruin everything.","Anyone who plugs in is a coward."]}
    }
  }
};

// ---------- VARIANTS ----------
// Another version of a dilemma, with a changed setup that changes the question. Each run draws one version of each
// dilemma it plays. A variant replaces only the fields it lists, and keeps the dilemma's option ids.
const VARIANTS = {
  monty: [{
    title:"The Host Who Didn't Know",
    text:"You are on a game show. In front of you are three closed doors. Behind one is a car, the prize. Behind each of the other two is a goat. You pick door 1. It stays closed.\n\nThis host has no idea where the car is, and he says so. He wanders over to door 3, shrugs, and opens it. It could have been the car. It happens to be a goat. Then he turns to you: you may keep door 1, or switch to door 2.",
    src:"A variation on the Monty Hall problem, known to probability teachers as Monty Fall.",
    assumptions:[
      {t:"That this is the famous puzzle. With a host who doesn't know, staying and switching are 50/50."},
      {t:"That he is telling the truth about not knowing. If he is acting, switching wins 2 times in 3 again."},
      {t:"That what a host says about himself is the rule he actually follows.",
       unlock:{id:"askhost",label:"Ask to see how the host has behaved on earlier shows",tags:["reframe"]}}
    ],
    split:{stay:55,switch:37,askhost:8},
    steel:{
      stay:{good:"A door opened by chance tells you nothing about which of the other two has the car. It is an even bet, so there is no reason to give up the door you chose.",bad:["Switching is for people who can't commit.","Your first instinct is always right."]},
      switch:{good:"If he knows more than he admits, switching wins 2 times in 3. If he doesn't, you have lost nothing. Switching is never the worse bet.",bad:["Switching is more exciting.","The host is always lying, so do the opposite."]}
    }
  }],
  boxes: [{
    title:"The Auditor's Odds",
    text:"In the story, the Auditor is the one who decides whether the stars come back. It has made this offer to a thousand players before you, and it was right about what they would choose six times in ten. It tells you so.\n\nTwo boxes sit in front of you. The clear one holds a thousand stars, and you can see them. The closed one holds either a million stars or nothing. Yesterday the Auditor predicted your choice. If it predicted you would take only the closed box, it put the million inside. If it predicted you would take both, it left the closed box empty. The boxes are already filled.",
    src:"A variation on Newcomb's problem, with a predictor that is often wrong.",
    assumptions:[
      {t:"That the prediction is already fixed, and nothing you do now can change what is in the box."},
      {t:"That six in ten is a fact about you. It may be far better or far worse at predicting people like you."},
      {t:"That you have to choose before you understand the predictor.",
       unlock:{id:"askhow",label:"Ask the Auditor how it predicts, before choosing",tags:["reframe"]}}
    ],
    split:{one:44,two:49,askhow:7},
    steel:{
      one:{good:"Six in ten who take one box walk away with a million. Even with a predictor this poor, the average beats taking both by a wide margin.",bad:["Taking both is greedy.","The Auditor punishes anyone who doubts it."]},
      two:{good:"The boxes are already filled, and this predictor is barely better than a coin. Whatever is inside the closed box, taking both gives you a thousand more.",bad:["People who take one box believe in magic.","More is always better."]}
    }
  }],
  dog: [{
    title:"The Enemy at the Gate",
    text:"The war is over. You give up your throne and walk north into the Himalaya with your brothers and your wife. On the road a man joins you, a soldier from the other side. In the war he killed your friends, and he has never apologised. One by one the others fall on the mountain and die. When you could not go on, he carried you.\n\nAt the top, Indra, king of the gods, comes down in his chariot to carry you to heaven in your own body. But this man is not allowed in heaven. Leave him, says Indra, and come.",
    src:"A variation on the Mahabharata's Book of the Great Journey (महाप्रस्थानिक पर्व), where the companion is a dog.",
    options:[{id:"enter",label:"Enter heaven",tags:["world"]},{id:"refuse",label:"Refuse to enter without him",tags:["loyal","we"]}],
    assumptions:[
      {t:"That heaven is worth having on these terms."},
      {t:"That carrying you settles what he did. What he owed the dead is not something he could pay to you."},
      {t:"That Indra's rule cannot be questioned.",
       unlock:{id:"ask",label:"Ask Indra why he is not allowed",tags:["reframe"]}}
    ],
    split:{enter:46,refuse:38,ask:16},
    steel:{
      enter:{good:"He killed people you loved, and one act of kindness doesn't cancel that. You owe him thanks. You don't owe him your place in heaven.",bad:["Anyone who enters is heartless.","Enemies stay enemies forever."]},
      refuse:{good:"He stayed when no one else could, and he asked for nothing. Leaving him now would make you the kind of person who uses others and walks on.",bad:["People who enter were never good.","The war doesn't matter any more."]}
    }
  }],
  theseus: [{
    title:"The Ship and the Constitution",
    text:"The hero Theseus sailed home to Athens in a wooden ship, and the city kept it in the harbour as a memorial. Over the years each plank rotted and was replaced, until none of the original wood was left. Was it still his ship?\n\nYour country's constitution is that kind of ship. Over a century it has been amended so often that not one clause of the original wording survives, and some of its rules now say the reverse of what they said at first. Every change followed the proper process. Is it still the constitution the founders wrote?",
    src:"A variation on the ship in Plutarch's Life of Theseus.",
    options:[{id:"same",label:"Yes, it is the same constitution",tags:["continuity"]},{id:"new",label:"No, it is a new one",tags:["change"]}],
    assumptions:[
      {t:"That identity lives in the parts. It might live in the pattern, or in the story told about it."},
      {t:"That there is a single fact of the matter, and the question has one answer."},
      {t:"That this is about paper. Most of the cells in your body have also been replaced.",
       unlock:{id:"both",label:"It is the same in some senses and not in others",tags:["reframe"]}}
    ],
    split:{same:49,new:31,both:20}
  }],
  kashi: [{
    title:"The Settlement",
    text:"Years ago your company poisoned a town's well. People got sick, and some never recovered. You signed the papers that allowed it. Nobody has ever connected it to you.\n\nThere is a legal route. Pay into a fund, with no admission of guilt, and the matter is closed. Your record stays clean, and no one will ever ask about it again. When Kalabhairava cut off Brahma's fifth head, he was told much the same about Kashi.",
    src:"A modern version of the Kapalamochana story in the Puranas.",
    options:[{id:"rite",label:"Pay into the fund and move on",tags:["world"]},{id:"carry",label:"Refuse the deal and carry the harm",tags:["duty"]}],
    assumptions:[
      {t:"That forgiveness is the law's to give, and not the harmed people's."},
      {t:"That a loophole the law built on purpose is still a loophole. Perhaps it exists because people need a way to pay."},
      {t:"That paying and making amends are alternatives.",
       unlock:{id:"both",label:"Pay, and also go to the people you harmed",tags:["reframe","we"]}}
    ],
    split:{rite:39,carry:27,both:34},
    steel:{
      rite:{good:"The money reaches sick people now, while a court case could take decades. A system needs a way for people to pay without first destroying themselves.",bad:["People who refuse just enjoy feeling guilty.","Paying always settles everything."]},
      carry:{good:"The harm was done to people, and a payment with no admission leaves them out. It buys your silence and calls that justice.",bad:["Anyone who pays is a hypocrite.","Suffering is always good for you."]}
    }
  }],
  tyrant: [{
    title:"The Known Medicine",
    text:"For twenty years you have taken the same medicine for a condition that would otherwise kill you. It is cruel to you: it clouds your thinking and costs you a week of every month. But you know exactly what it does, and you have built your life around it.\n\nA new treatment has appeared. It might free you altogether. No one has taken it for more than a year, and nobody knows what it does after that. Your doctor says the choice is yours. In the story, a priest put the old view plainly: better a familiar tyrant than an unknown, infinite, mysterious god.",
    src:"A variation on a line in the story नैकेश्वर.",
    options:[{id:"keep",label:"Stay on the known medicine",tags:["stay"]},{id:"unknown",label:"Try the new treatment",tags:["change"]}],
    assumptions:[
      {t:"That being predictable makes a thing safe. A harm you can predict is still harm."},
      {t:"That not knowing is worse than knowing something bad."},
      {t:"That you must take one of the two.",
       unlock:{id:"neither",label:"Refuse both, and ask who decided there were only two",tags:["reframe","we"]}}
    ],
    split:{keep:41,unknown:47,neither:12},
    steel:{
      keep:{good:"You know how to live with this, and the people around you do too. A year of good results says nothing about year ten, and you can't take it back.",bad:["People who want change are just restless.","Your doctor can't be wrong about the old medicine."]},
      unknown:{good:"Staying guarantees more of what is already costing you a quarter of your life. Someone has to take the first years of any treatment, and the possible gain is large.",bad:["People who stay are cowards.","Anything new is better than anything old."]}
    }
  }],
  bhishma: [{
    title:"The Signed Paper",
    text:"When you joined this company you signed a promise: you would never reveal what you see inside, whatever happened. You signed so that your team could win the contract that kept them all employed. For twenty years you have kept it, and people trust you because of it.\n\nToday you learned that one of the company's products is hurting people, and that the company is hiding it. Telling anyone means breaking your promise.",
    src:"A modern version of Bhishma's vow, from the Mahabharata.",
    options:[{id:"keep",label:"Keep the promise",tags:["duty","continuity"]},{id:"break",label:"Break it",tags:["change"]}],
    assumptions:[
      {t:"That the promise means today what it meant when you signed. The words stayed the same. The company didn't."},
      {t:"That keeping your word and doing right can never conflict."},
      {t:"That keeping the promise requires hiding that you are keeping it.",
       unlock:{id:"speak",label:"Keep the promise, and say aloud that there is something you can't say",tags:["reframe"]}}
    ],
    split:{keep:21,break:61,speak:18},
    steel:{
      keep:{good:"A promise is only worth something if it holds when it is costly. People told you things because you signed, and they are owed that even now.",bad:["People who break promises were never honest.","The company knows best."]},
      break:{good:"You signed to protect people's work. When the promise starts protecting a harm, keeping it betrays the reason you made it.",bad:["Contracts are just paper.","People who keep quiet are just cowards."]}
    }
  }],
  euthyphro: [{
    title:"Just Because It Is Law?",
    text:"Outside a courthouse, a man is about to testify against his own father, who broke an old law nobody has enforced in decades. He is sure the law requires it. A friend stops him on the steps and asks him a question.\n\nIs something just because the law says so? Then whatever the law says would be just, even cruelty. Or does the law say so because it is just? Then justice comes from somewhere else, and the law only passes it on.",
    src:"The question from Plato's Euthyphro, in the form that legal positivists and natural-law thinkers argue over.",
    options:[{id:"commanded",label:"Just because the law says so",tags:["duty"]},{id:"good",label:"The law says so because it is just",tags:["seeker"]}],
    assumptions:[
      {t:"That the laws agree with one another. They often don't."},
      {t:"That just means one thing for everyone."},
      {t:"That justice has a single source.",
       unlock:{id:"neither",label:"Neither. The question assumes justice comes from one place",tags:["reframe"]}}
    ],
    split:{commanded:18,good:61,neither:21},
    steel:{
      commanded:{good:"People disagree about justice and always will. A law is what a society settled on by a known process, and that gives it an authority no private opinion has.",bad:["Questioning the law is arrogant.","Whatever is old must be right."]},
      good:{good:"If the law could make cruelty just by saying so, nobody could ever call a law unjust. People do, and they are sometimes right, so justice must stand outside it.",bad:["Laws are made up, so the question is silly.","People who follow laws can't think for themselves."]}
    }
  }],
  halftruth: [{
    title:"The Doctor's Half-Truth",
    text:"You are a doctor. Your patient is about to refuse the one treatment that could save him. It works for about one person in five, and without it he will die within the year. You know him well: if he hears 'one in five', he will refuse and go home.\n\nHe is asking you how it usually goes. You could say 'many patients recover'. That is true, and he would take the treatment. Everyone on your ward would call it kindness.",
    src:"A modern version of नरो वा कुंजरो वा, from the Mahabharata's Book of Drona.",
    options:[{id:"say",label:"Say 'many patients recover', and leave it there",tags:["util"]},{id:"refuse",label:"Give him the plain number",tags:["duty"]}],
    assumptions:[
      {t:"That a statement that is technically true cannot be a lie."},
      {t:"That taking the treatment is really better for him. You are counting his year, and he may count it differently."},
      {t:"That your honesty belongs to you alone. Your other patients trust what doctors say, and that trust is also at stake.",
       unlock:{id:"loud",label:"Tell him both, and stay with him while he decides",tags:["reframe"]}}
    ],
    split:{say:29,refuse:48,loud:23},
    steel:{
      say:{good:"He has a fear that will cost him his only chance. Choosing what to stress is part of caring for someone, and the words you would use are true.",bad:["Patients can't understand numbers.","Doctors always know best."]},
      refuse:{good:"It is his life and his decision, and he can't make it on a number you have hidden. Once patients suspect doctors do this, no reassurance from a doctor means anything.",bad:["People who soften things are liars.","Numbers matter more than people."]}
    }
  }]
};

// ---------- AXES ----------
// Opposed pairs of tags, used to notice how a player leans (adaptation only, never scored).
// words: how each side is named when the game asks "what changed?".
const AXES = [
  {a:["duty"],              b:["util"],             words:["the rule","the result"]},
  {a:["continuity","stay"], b:["change","switch"],  words:["holding on","letting go"]},
  {a:["loyal"],             b:["we"],               words:["your own","the many"]},
  {a:["now","world"],       b:["later","seeker"],   words:["what you can have now","what you don't yet know"]},
];

// ---------- RUNGS ----------
// Each rung draws PER_RUNG dilemmas at random from its pool.
// "trolley" is a chain: it is always followed by its adaptive sequel, and the pair uses two slots.
// "always" is placed last in that rung on every run.
const PER_RUNG = 2;
const RUNGS = [
  {name:"Doors",   mr:"दारं",   pool:["shreyas","monty","nachiketa","boxes","sleeping","envelopes"],
   about:"Choices about what to take, and when. Every door is a guess about what is behind it, and about who built the door."},
  {name:"Bodies",  mr:"देह",    pool:["trolley","shibi","angulimala","dog","ekalavya","arjuna","city","veil"],
   about:"Choices that someone's body pays for. The numbers here have faces, and sometimes the face is one you love."},
  {name:"Words",   mr:"शब्द",   pool:["halftruth","kashi","draupadi","bhishma","karna","mustard","harishchandra","savitri","solomon"],
   about:"Vows, rites and half-truths. A word can keep its letters and change its meaning."},
  {name:"Gods",    mr:"देव",    pool:["tyrant","elephant","euthyphro","pascal","tweeted","earned","tukaram","job","heap","lastbeliever"], always:"fifthhead",
   about:"Who gets to say what is true? At the top of this rung, the golden head is waiting."},
  {name:"Mirrors", mr:"आरसे",  pool:["theseus","jonah","ai","answers","beacon","simstar","butterfly","gyges","machine"],
   about:"Who is doing the choosing? You, your avatar, a machine, or the answers someone handed you."},
];
const CHAINS = { trolley:"ADAPT_TROLLEY" };
// Dilemmas with a fixed chance of being drawn in a run, whatever the other weights are.
const CHANCE = { trolley:0.25 };
// What each trolley answer looks like when the sequel reminds the player of it.
const EARLIER = { pull:"you pulled it", leave:"you chose not to pull it", shout:"you shouted a warning instead of pulling it" };
const FINAL = "rank";
