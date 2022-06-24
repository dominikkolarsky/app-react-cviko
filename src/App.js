import './App.css';
import { FormSection, Formular, InputDiv, KontrolaButton, MainTitle, PageContainer, SectionTitle } from './AppStyles';
//
import { useReducer, useState, useEffect } from 'react';

// initial objednavka

const defaultObjednavka = {

  detske: false,
  detskePocet: 0,

  horske: false,
  horskePocet: 0,

  silnicni: false,
  silnicniPocet: 0,

  gravel: false,
  gravelPocet: 0,

  doba: 1,

  nosic: 1,

  finalCena: 0,
  rozpocet: 0,
};

// reducer funkce pro useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "toggle_text":
      return { ...objednavka, [action.key]: action.value };
    case "toggle_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "toggle_detske":
      return { ...objednavka, detske: !objednavka.detske };
    case "toggle_horske":
      return { ...objednavka, horske: !objednavka.horske };
    case "toggle_silnicni":
      return { ...objednavka, silnicni: !objednavka.silnicni };
    case "toggle_gravel":
      return { ...objednavka, gravel: !objednavka.gravel };
    default: return objednavka;
  }
}


function App() {

  const [finalPrice, setFinalPrice] = useState(0);
  const [checked, setChecked] = useState(0);

  const [showFinalPrice, setShowFinalPrice] = useState(0);

  //state pro useReducer hooku
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  useEffect(() => { console.log(JSON.stringify(objednavka)) }, [objednavka]);
  // useEffect
  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
    // console.log(newFinalPrice)
  }, [objednavka]);

  const getFinalPrice = (objednavka) => {
    let detskeCena = 0;
    let horskeCena = 0;
    let silnicniCena = 0;
    let gravelCena = 0;

    if (objednavka.detske) { detskeCena = 200 }
    if (objednavka.horske) { horskeCena = 500 }
    if (objednavka.silnicni) { silnicniCena = 1500 }
    if (objednavka.gravel) { gravelCena = 2500 }

    let price = (detskeCena * objednavka.detskePocet + horskeCena * objednavka.horskePocet + silnicniCena * objednavka.silnicniPocet + gravelCena * objednavka.gravelPocet) * objednavka.doba * objednavka.nosic;

    setFinalPrice(price)
    return price;
  }

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOK = 1;
      setChecked(checkOK);
    } else {
      let checkNOK = 2;
      setChecked(checkNOK);
    }
  };


  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis"><MainTitle>Vaše objednávka</MainTitle></FormSection>
        {/* vyber kola a pocet kol */}
        <FormSection>
          <SectionTitle>Výběř typu kola:</SectionTitle>
          <InputDiv>
            <input type="checkbox" id="detske" onClick={(e) => {
              dispatch({
                type: 'toggle_detske',
                value: e.target.value,
                key: 'detske'
              })
            }} />
            <label>dětské  200 Kč/den</label>
          </InputDiv>
          <InputDiv>
            <label> počet kol:</label>
            <input type="number" id="detskePocet" value={objednavka.detskePocet} onChange={(e) => {
              dispatch({
                type: "toggle_number",
                value: e.target.value,
                key: "detskePocet",
              });
            }} />
          </InputDiv>

          <InputDiv>
            <input type="checkbox" id="horske" onClick={(e) => {
              dispatch({
                type: 'toggle_horske',
                value: e.target.value,
                key: 'horske'
              })
            }} />
            <label>horské 500 Kč/den</label>
          </InputDiv>
          <InputDiv>
            <label> počet kol:</label>
            <input type="number" id="horskePocet" value={objednavka.horskePocet} onChange={(e) => {
              dispatch({
                type: "toggle_number",
                value: e.target.value,
                key: "horskePocet",
              });
            }} />
          </InputDiv>

          <InputDiv>
            <input type="checkbox" id="silnicni" onClick={(e) => {
              dispatch({
                type: 'toggle_silnicni',
                value: e.target.value,
                key: 'silnicni'
              })
            }} />
            <label>silniční 1500 Kč/den</label>
          </InputDiv>
          <InputDiv>
            <label> počet kol:</label>
            <input type="number" id="silnicniPocet" value={objednavka.silnicniPocet} onChange={(e) => {
              dispatch({
                type: "toggle_number",
                value: e.target.value,
                key: "silnicniPocet",
              });
            }} />
          </InputDiv>

          <InputDiv>
            <input type="checkbox" id="gravel" onClick={(e) => {
              dispatch({
                type: 'toggle_gravel',
                value: e.target.value,
                key: 'gravel'
              })
            }} />
            <label>gravel 2500 Kč/den</label>
          </InputDiv>
          <InputDiv>
            <label> počet kol:</label>
            <input type="number" id="gravelPocet" value={objednavka.gravelPocet} onChange={(e) => {
              dispatch({
                type: "toggle_number",
                value: e.target.value,
                key: "gravelPocet",
              });
            }} />
          </InputDiv>
        </FormSection>
        {/* pocet dnu */}
        <FormSection>
          <SectionTitle>Počet dnů:</SectionTitle>
          <select id='doba' onClick={(e) => {
            dispatch({
              type: 'toggle_number',
              value: e.target.value,
              key: 'doba'
            })
          }}>
            <option value={1}>1 den</option>
            <option value={2}>2 dny</option>
            <option value={7}>7 dnů</option>
            <option value={14}>14 dní</option>
          </select>
        </FormSection>
        {/* nosic */}
        <FormSection>
          <SectionTitle>Nosič</SectionTitle>
          <div>
            <InputDiv>
              <input type="radio" name="nosic" id="nosicNe" value={1} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'nosic'
                })
              }} />
              <label>není třeba cyklonosič</label>
            </InputDiv>
            <InputDiv>
              <input type="radio" name="nosic" id="nosicStresni" value={1.05} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'nosic'
                })
              }} />
              <label>cyklonosič střešní (+5%)</label>
            </InputDiv>
            <InputDiv>
              <input type="radio" name="nosic" id="nosicTazne" value={1.10} onClick={(e) => {
                dispatch({
                  type: 'toggle_number',
                  value: e.target.value,
                  key: 'nosic'
                })
              }} />
              <label>cyklonosič na tažné zařízení (+10%)</label>
            </InputDiv>
          </div>
        </FormSection>
        <FormSection>
          {/* kalkulace */}
          <SectionTitle>Konečná kalkulace</SectionTitle>

          <label>Finální cena:</label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <label>Zadejte váš rozpočet:</label>
          <input type="text" id="rozpocet" value={0} onChange />
          {/* kontrola*/}

          <KontrolaButton checked={checked} onClick={() => {
            checkPrice(objednavka);
            console.log(checked);


          }}>
            Kontrola
          </KontrolaButton>
        </FormSection>
      </Formular>
    </PageContainer>
  );
}

export default App;
