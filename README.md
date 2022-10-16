# PUber
![](https://techcrunch.com/wp-content/uploads/2019/06/Uber-Eats-App-Merge.png)

## Inspiration
Constantly booking overpriced Ubers and getting jealous of people who own cars. Or the T. Basically anyone who didn't take Ubers.

//Improve

## What it does
PUber, or Predictive-Uber for long, accurately predicts Uber prices for the next five hours based on (**insert weather features**) features. A user can input their "Origin" and "Destination" and the application automatically determines this distance, running this data through our custom Multi-layer Perceptron ML model, and outputs its best prediction for prices in the future. This data is displayed through an interactive chart on the website, showing price predictions for a currently fixed timeframe of 5 hours. 

## How we built it
Explain peeps.

- Used Google Cloud content to access Google Maps API


## Challenges we ran into
REACT, Components not connecting with each other, determining best features to incorporate in model, fine-tuning, getting custom API to return responses
## Accomplishments that we're proud of
Accurate MLP model, accurate to less than a dollar within a range of $6 to $44 Uber rides. Custom PUber API so anyone can use this trained model for their own projects, Full-Stack Application with **insert Stack here**
## What we learned
A lot
## What's next for PUber
- Updating UI to be more interactive (and look prettier) with more React animations
- hosting on website
- adding other features besides weather to further improve model accuracy
- Adding functionality for other ride service prediction (such as Lyft, taxis, etc)

