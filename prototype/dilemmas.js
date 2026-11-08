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
  // Adaptive pair: which one you get depends on your trolley answer.
  trolleyKin: {
    title:"The Lever, Again", mr:"तो तुमचा सख्खा असेल तर?",
    text:"The same trolley, the same five workers, the same lever. A minute ago you pulled it. Now it is happening again, and you have a few seconds.\n\nBut look at the side track. The one person working there is your own brother or sister. If you pull, your sibling dies and the five live. If you don't, the five die and your sibling walks home tonight.",
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
    text:"The same trolley, the same lever. A minute ago you chose not to pull it. Now it is happening again, and you have a few seconds.\n\nThis time look at the five on the main track. One of them is your own brother or sister. The one person on the side track is a stranger. If you pull, your sibling and four others live, and the stranger dies.",
    src:"The story asks it directly: पाच लोकांना वाचवण्यासाठी दुसऱ्याच एखाद्याला मारलेलं चालेल का? तो तुमचा सख्खा कोणी असेल तर?",
    options:[{id:"pull",label:"Pull the lever now",tags:["util","loyal"]},{id:"leave",label:"Still do not pull",tags:["duty"]}],
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
};

// ---------- RUNGS ----------
// Each rung draws PER_RUNG dilemmas at random from its pool.
// "trolley" is a chain: it is always followed by its adaptive sequel, and the pair uses two slots.
// "always" is placed last in that rung on every run.
const PER_RUNG = 2;
const RUNGS = [
  {name:"Doors",   mr:"दारं",   pool:["shreyas","monty","nachiketa","boxes"],
   about:"Choices about what to take, and when. Every door is a guess about what is behind it, and about who built the door."},
  {name:"Bodies",  mr:"देह",    pool:["trolley","shibi","angulimala","dog"],
   about:"Choices that someone's body pays for. The numbers here have faces, and sometimes the face is one you love."},
  {name:"Words",   mr:"शब्द",   pool:["halftruth","kashi","draupadi","bhishma"],
   about:"Vows, rites and half-truths. A word can keep its letters and change its meaning."},
  {name:"Gods",    mr:"देव",    pool:["tyrant","elephant","euthyphro","pascal"], always:"fifthhead",
   about:"Who gets to say what is true? At the top of this rung, the golden head is waiting."},
  {name:"Mirrors", mr:"आरसे",  pool:["theseus","jonah","ai","answers"],
   about:"Who is doing the choosing? You, your avatar, a machine, or the answers someone handed you."},
];
const CHAINS = { trolley:"ADAPT_TROLLEY" };
const FINAL = "rank";
