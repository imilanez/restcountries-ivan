import React from 'react';
import Autosuggest from 'react-autosuggest';
import './autosuggest.css';

class RestCountriesAutosuggest extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        let response = await fetch("https://restcountries.eu/rest/v2/name/" + inputValue + "?fields=name;region;population;languages;currencies");
        let data = await response.json();
        return data;
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span className="name" style={{textAlign: 'left'}}>
                Country Name: {suggestion.name},<br />
                Region: {suggestion.region},<br />
                Currency Name: {suggestion.currencies[0].name},<br />
                Language Name: {suggestion.languages[0].name},<br />
                Population: {suggestion.population.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            </span>
        </span>
    );

    renderCards = suggestion => (
        <span className="sugg-option">
            <span className="name">
                Country Name: {suggestion.name},
                Region: {suggestion.region},
                Currency Name: {suggestion.currencies[0].name},
                Language Name: {suggestion.languages[0].name},
                Population: {suggestion.population.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            </span>
        </span>
    );

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(data => {
                if (data.Error) {
                    this.setState({
                        suggestions: []
                    });
                } else {
                    this.setState({
                        suggestions: data
                    });
                }
            })
    };

    shouldRenderSuggestions(value) {
        return value.trim().length > 2;
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type country name',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                renderSuggestion={this.renderSuggestion}
                renderCards={this.renderCards}
                inputProps={inputProps}
            />
        );
    }
}

export default RestCountriesAutosuggest;