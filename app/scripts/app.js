/** @jsx React.DOM */

var React = window.React = require('react'),
    mountNode = document.getElementById("app");

var IshiharaStore = [
    {
        imageSrc: "http://archrobot.cu.cc/wp/wp-content/uploads/2015/02/57.jpg",
        choices: {
            57: 'normal',
            8: 'daltonien',
            16: 'impossible'
        }
    },
    {
        imageSrc: "http://archrobot.cu.cc/wp/wp-content/uploads/2015/02/42.jpg",
        choices: {
            42: 'normal'
        }
    },
    {
        imageSrc: "http://archrobot.cu.cc/wp/wp-content/uploads/2015/02/5.jpg",
        choices: {
            5: 'normal'
        }
    }
];

function buildChoices(imageId) {
    var testChoices = IshiharaStore[imageId].choices;
    var choices = [];

    for (var choice in testChoices) {
        if (testChoices.hasOwnProperty(choice)) {
            choices.push(choice);
        }
    }

    return choices;
}

var IshiharaImage = React.createClass({
    render: function () {
        return (<img src={this.props.imageSrc} alt="Test d'Ishihara" className="img-circle" />);
    }
});

var IshiharaForm = React.createClass({
    getInitialState: function () {
        return {value: 0};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
    },
    render: function () {
        var createOption = function (item, index) {
            return (<option onChange={this.handleChange} value={item} key={index}>{item}</option>);
        }
        return (<div>
                    <select value={this.state.value}>
                        {this.props.values.map(createOption)}
                    </select>
                    <button onClick={this.props.onClick}>Valider mon choix!</button>
                </div>);
    }
});

var WizardView = React.createClass({
    render: function () {
        return (<div>
                    <IshiharaImage imageSrc={this.props.imageSrc} />
                    <h2> Que voyez-vous ? </h2>
                    <IshiharaForm values={this.props.values} onClick={this.props.onClick} />
                </div>);
    }
});

var IshiharaWizard = React.createClass({
    getInitialState: function () {
        return {step: 0, values: []};
    },
    handleNextStep: function (e) {
        if ((this.state.step + 1) >= IshiharaStore.length) {
            // TODO: pass in final view.
            return;
        }
        var currentChoice = e.target.value;
        var nextValues = this.state.values.concat([currentChoice]);
        this.setState({step: this.state.step + 1, values: nextValues});
    },
    render: function () {
        var imageSrc = IshiharaStore[this.state.step].imageSrc;
        var choices = buildChoices(this.state.step);
        var currentView = (<WizardView imageSrc={imageSrc} values={choices} onClick={this.handleNextStep} />);
        return (
                <div>
                    {currentView}
                </div>
                );
    }
});

React.render(<IshiharaWizard />, mountNode);

