const React = require('react');

const ThirdPage = ({state, returnHome, saveHistory}) => {
  return (
    <div className="description">
      <h1>{`${state.currentCity}, ${state.currentCountry}`}</h1>
      <img src={state.pictures} width="345" height="345" alt="Logo" />
      <br/>
      <p>{state.description}</p>
      <br/>
      <form action={state.link} target="_blank">
        <input type="submit" value="See Flight Prices"/>
      </form>
      <br/>
      <button onClick={returnHome}>Return</button>
      <br/>
      <button onClick={saveHistory}>Save</button>
    </div>
  )
}

export default ThirdPage;


