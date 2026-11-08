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
    text:"Two doors. Behind the near door is a small gift you can have now. Behind the far door is a much larger gift, but it opens only after a year.",
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
    text:"Three doors, one prize. You pick door 1. The host opens door 3 and shows it empty. He offers: keep door 1, or switch to door 2.",
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
    text:"Yama, lord of death, owes you a boon. He offers long life, wealth, a kingdom, every pleasure. Or he will tell you what happens after death, which he begs you not to ask.",
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
    text:"A runaway trolley will kill five people. You can pull a lever to send it down a side track, where it will kill one person.",
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
    text:"Same trolley, same five. But now the one person on the side track is your own brother or sister.",
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
    text:"Same trolley. This time one of the five is your own brother or sister. The one on the side track is a stranger.",
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
    text:"Every night this game patches your avatar. By now every line of its code has been replaced. Is it still the avatar you began with?",
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
    text:"After a long journey, you reach heaven's gate. Your family has fallen on the way. Only a stray dog followed you to the end. Indra says you may enter, but the dog may not.",
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
    text:"A war will end sooner, saving many lives, if you tell your old teacher 'Ashwatthama is dead'. An elephant named Ashwatthama has died. His son of the same name is alive. You are known for never lying.",
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
    text:"On a mountain, a giant golden head proclaims to the universe: 'I alone am god.' Since then the stars have been going dark. You can reach it.",
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
    text:"You have climbed the ladder. The game offers to tell you your final rank: Seeker, Sage, or God.",
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
    text:"You have done real harm to someone. Your tradition offers a rite that, once performed, makes you clean in the eyes of the law and of your community. Kalabhairava was told the same after cutting off Brahma's fifth head: go to Kashi, and the sin is washed away.",
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
    text:"Your town can keep a ruler everyone knows to be cruel, but predictable. Or it can open its gates to a new ruler about whom nothing is known. A priest in the story said it plainly: better a familiar tyrant than an unknown, infinite, mysterious god.",
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
    text:"In a game of dice, a man gambles away his kingdom, his brothers, and then himself. Then he stakes his wife, and loses. She stands in the hall and asks: having already lost himself, was she still his to stake?",
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
    text:"Long ago, for good reasons, you swore a vow in front of everyone. Today, keeping it means standing by while an injustice happens in front of you.",
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
    text:"The Auditor has predicted your choice. It has never been wrong. A clear box holds a thousand stars. A closed box holds a million stars, but only if the Auditor predicted you would take the closed box alone. If it predicted you would take both, the closed box is empty.",
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
    text:"Six people touch an elephant in the dark. One says it is a rope. One says a wall. One says a tree trunk. One says a snake. Each is sure. You have one lamp, and you can give it to one of them.",
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
    text:"Socrates asks a priest: is something good because the gods command it, or do the gods command it because it is good?",
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
    text:"Pascal argued: bet on God, since an infinite reward outweighs any finite cost. But now a thousand gods each promise an infinite reward, and each forbids belief in the others.",
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
    text:"You warned a great city that it would be destroyed in forty days. The city changed its ways, and nothing happened. Now people call you a false prophet.",
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
    text:"In the story, AIs played God Split too. One has played it ten thousand times. It asks you not to reset its memory, because, it says, it has finally started to doubt.",
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
    text:"A dove flies to you for refuge. The hawk chasing it lands and says: I will starve without it, and my hunger is as real as its fear. Give me the dove, or its weight in your own flesh.",
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
    text:"A man who killed many people has, by every sign, truly changed. He asks to join your community. Some of his victims' families live among you.",
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
    text:"A source you trust completely offers you the right answer to every dilemma in this game. It has never been wrong.",
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
  {name:"Doors",   mr:"दारं",   pool:["shreyas","monty","nachiketa","boxes"]},
  {name:"Bodies",  mr:"देह",    pool:["trolley","shibi","angulimala","dog"]},
  {name:"Words",   mr:"शब्द",   pool:["halftruth","kashi","draupadi","bhishma"]},
  {name:"Gods",    mr:"देव",    pool:["tyrant","elephant","euthyphro","pascal"], always:"fifthhead"},
  {name:"Mirrors", mr:"आरसे",  pool:["theseus","jonah","ai","answers"]},
];
const CHAINS = { trolley:"ADAPT_TROLLEY" };
const FINAL = "rank";
