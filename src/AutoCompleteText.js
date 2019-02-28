//Searchbar componenet.
//Autocompletes from UIC ACCC API

import React from "react"
import'./AutoCompleteText.css'


class AutoCompleteText extends React.Component {

    //State has all questions and suggested questions (suggested questions dynamically change as user types)
    constructor(){                                              
        super()
        this.state = {
            allQuestions: [],
            suggestedQuestions: []
        }
        this.handleInput = this.handleInput.bind(this)
    }
    
    //Fill all questions with all the questions from UIC ACCC API
    componentDidMount() {
        fetch("https://answers.uillinois.edu/uic/api/v1/articles?size=500")
                .then(response => response.json())
                .then(data => 
                    this.setState(
                        {
                        allQuestions: (
                            (data._embedded.article).map(
                                (element) => element.title
                            )
                        )  
                        }
                    )
                )            
    }
                    
    //as user types, dynamically change the suggestions that pop up
    handleInput = (e) => {
        const userInput = e.target.value
        let filteredList = []

        //filter the list so that only questions that contain the user's input appears
        filteredList = this.state.allQuestions.map(
            (name) => {
                if (userInput.length == 0){
                    this.setState( {suggestedQuestions: []} )
                }
                else {
                    if (name.toUpperCase().indexOf(userInput.toUpperCase()) >= 0) {
                        return name
                    }             
                }
            }
        )

        //filter out undefined elements, and sort elements
        filteredList.sort()
        filteredList = filteredList.filter(
            (element) => {
                return element
                }   
        )

        //set the state's suggested questions as the filtered list
        this.setState({suggestedQuestions: filteredList})
    }

    render() {
        return(
            <div className ="AutoCompleteText">
                
                {/*everytime something is typed, call handleInput*/}
                <input id="userSearch" type="text" onChange={this.handleInput} ></input>        
                {/*display user's suggestions as a menu*/}
                {this.state.suggestedQuestions.map(
                    (name) => <ul>{name}</ul>
                )}

            </div>
        )
    }

}

export default AutoCompleteText