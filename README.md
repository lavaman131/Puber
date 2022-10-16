# PUber
![](https://techcrunch.com/wp-content/uploads/2019/06/Uber-Eats-App-Merge.png)

## Inspiration
Constantly booking overpriced Ubers and getting jealous of people who own cars. Or the T. Basically anyone who didn't take Ubers. We wanted to beat Uber's volatility in pricing and get the lowest ride price within the near future. 

## What it does
PUber, or Predictive-Uber for long, accurately predicts Uber prices for the next ten hours based on temperature, cloudiness, chance of rain, humidity, wind speed (MPH), distance, and hour of the day as features. A user can input their "Origin" and "Destination" and the application automatically determines this distance, running this data through our custom Multi-layer Perceptron ML model, and outputs its best prediction for prices in the future. This data is displayed through an interactive chart on the website, showing price predictions for a currently fixed timeframe of 10 hours. 

## How we built it
- Backend: 
  - Developed Custom REST API with Python Flask library, developed deep learning model with tensorflow based off of Multi-Layer Perceptron (MLP) neural network trained on over 50k data points, used Google Cloud content to access Google Maps API (a key component within our application)
- Frontend: 
  - Designed minimal and easy to use interface
  - Created frontend with vanilla JavaScript, HTML, and Tailwind CSS

## Challenges we ran into

We ran into a multitude of issues throughout our experimentation and development process, ranging from small tuning problems to large crashes of our stack. First, our initial React website refused to update compiled changes to local host, and after dozens and dozens of iterations of React Apps, the idea was adjusted and a new website approach was pursued (we think the issue lies with some serviceWorker or caching issue).

Secondly, an example of an issue we faced with the front-end involves a pesky double click bug, where we had to double click the "Calculate" button to display the ride prediction chart. Unfortunately, we wrote over some old code and had to re-find our solution from hours earlier. This ended up being solved by some handy boolean algebra (we were displaying only when our )

Next, various component within our full-stack weren't connecting with each other, 

Finally, due to some issues with git (and our own mistakes), we overwrote large portions of our one working copy of code, meaning that hours were spent combing through previous git commits and our own memory to reconstruct a working application, bit by bit. Those professors were preaching the power of Git for a reason, it seems. 


Components not connecting with each other, determining best features to incorporate in model, fine-tuning, getting custom API to return responses
## Accomplishments that we're proud of
Accurate MLP model, accurate to less than a dollar within a range of $6 to $44 Uber rides. Custom PUber API so anyone can use this trained model for their own projects, Full-Stack Application with **insert Stack here**

We tried and successfully developed two different models (ML and Deep Learning) based on a variety of features discussed above
## What we learned
- Full stack development (managing frontend and backend)
- Building scalable machine learning and deep learning systems
- Creating responsive websites with JavaScript, Html, and CSS
## What's next for PUber
- Updating UI to be more interactive (and look prettier) with more React animations
- hosting on website (add AWS Lambda for API Queries)
- adding other features besides weather to further improve model accuracy
- Adding functionality for other ride service prediction (such as Lyft, taxis, etc)
- Add in Uber's exact price API for more accurate real-time pricing



