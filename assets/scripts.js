//JEST JOKE SIMULATOR SCRIPT

var jokecount = 0

//source: https://www.countryliving.com/life/a27452412/best-dad-jokes/

var djokes = [
  "How do you get a squirrel to like you? Act like a nut.",
  "I don't trust stairs. They're always up to something.", 
  "This graveyard looks overcrowded. People must be dying to get in.",
  "What time did the man go to the dentist? Tooth hurt-y.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "I'm on a seafood diet. I see food and I eat it.",
  "I used to hate facial hair...but then it grew on me.",
  "What do you call an elephant that doesn't matter? An irrelephant.",
  "If you see a crime at an Apple Store, does that make you an iWitness?",
  "Wanna hear a joke about paper? Never mind—it's tearable.",
  "When does a joke become a dad joke? When it becomes apparent.",
  "Why are elevator jokes so classic and good? They work on many levels.",
  "What did the fish say when he hit the wall? Dam.",
  "Don't trust atoms. They make up everything!"
]
function telljokes(){
 document.getElementById("djokes").innerHTML = djokes[jokecount]
 jokecount += 1 
if(jokecount > djokes.length -1){
  jokecount = 0
}
 
}

/*-------------*/

var jokecount = 0

//source: http://www.jokes4us.com/celebrityjokes/donaldtrumpjokes.html

var dtjokes = [
  "What is Donald Trump telling all his supporters? Orange Is The New Black.",
  "How is Donald Trump going to shut down the Department of Education? By renaming it Trump University.", 
  "If minorities have the race card and women have the gender card, what do rednecks have? The Trump Card",
  "Why is Donald Trump always seen with Melania? Because all his other wives support Hillary.",
  "What is Donald Trumps biggest dilemma now that he's president? Finding a cabinet position for the thing on his head!",
  "Where's Donald Trump's favorite place to shop? Wall-mart!",
  "What do Donald Trump and a baby have in common? They both whine alot!",
  "What do you call a Disney Princess that supports Donald Trump? Snow White Supremacist.",
  "Why can't you compare Donald Trump to cancer? Because sometimes you can get rid of cancer.",
  "Whats Donald Trump's favorite nation? Discrimination.",
  "Humpty Trumpty wants a great wall. Humpty Trumpty wants Mexico to pay for it all.",
  "What do you call it, when a brainless creature takes over the world? The Trump-ocalypse."
]
function telldtjokes(){
 document.getElementById("dtjokes").innerHTML = dtjokes[jokecount]
 jokecount += 1 
if(jokecount > rjokes.length -1){
  jokecount = 0
}
 
}

/*-------------*/

//source:https://www.beano.com


var jokecount = 0

var rjokes = [
  "What do cows like to watch on Netflix? A good moo-vie.",
  "Why did Cinderella not get picked for the basketball team? She kept running away from the ball.", 
  "What sits at the bottom of the sea and bites its nails? A nervous wreck!",
  "I hate Russian dolls. They're so full of themselves?",
  "What do you call a fish with noe eye? fsh!",
  "What's orange and sounds like a parrot? A carrot.",
  "What do you call a magical dog? A labracadabrador!.",
  "What's a sheep's favourite food? A baaaanana.",
  "What's a vampire's favourite fruit? A neck-tarine!",
  "What did the bored goat say? Mehhh.",
  "What do you call a goat that paints pictures? Vincent Van Goat.",
  "What mouse was a Roman emporer? Juilius Cheeser!",
  "What did the tree say to the other tree? You look leafy.",
  "What did mummy pasta say to baby pasta? It's pasta your bedtime!"
]
function tellrjokes(){
 document.getElementById("rjokes").innerHTML = rjokes[jokecount]
 jokecount += 1 
if(jokecount > rjokes.length -1){
  jokecount = 0
}
 
}