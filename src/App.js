import { FormSection, FormSectionFlex, Formular, InputDiv, InputDivCol, KontrolaButton, MainTitle, PageContainer, SectionTitle } from './AppStyles';
//
import { useReducer, useState, useEffect } from 'react';

import detske from './detske.jpg';
import horske from './horske.jpg';
import silnicni from './silnicni.jpg';
import elektro from './elektro.jpg';

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
          <FormSectionFlex>
            {/* detske */}
            <InputDivCol>
              <img src={detske} style={{ height: '90px', width: 'auto' }} />
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
                <input type="number" id="detskePocet" min="0" style={{ width: '3em' }} value={objednavka.detskePocet} onChange={(e) => {
                  dispatch({
                    type: "toggle_number",
                    value: e.target.value,
                    key: "detskePocet",
                  });
                }} />
                <label> počet kol</label>
              </InputDiv>
            </InputDivCol>

            {/* horske */}
            <InputDivCol>
            <img src={horske} style={{ height: '90px', width: 'auto'  }}/>
              <InputDiv>
                <input type="checkbox" id="horske" min="0" onClick={(e) => {
                  dispatch({
                    type: 'toggle_horske',
                    value: e.target.value,
                    key: 'horske'
                  })
                }} />
                <label>horské 500 Kč/den</label>
              </InputDiv>
              <InputDiv>
                <input type="number" id="horskePocet" min="0" style={{ width: '3em' }} value={objednavka.horskePocet} onChange={(e) => {
                  dispatch({
                    type: "toggle_number",
                    value: e.target.value,
                    key: "horskePocet",
                  });
                }} />
                <label> počet kol</label>
              </InputDiv>
            </InputDivCol>

            {/* silbicni */}
            <InputDivCol>
            <img src={silnicni} style={{ height: '90px', width: 'auto' }} />
              <InputDiv>
                <input type="checkbox" id="silnicni" min="0" onClick={(e) => {
                  dispatch({
                    type: 'toggle_silnicni',
                    value: e.target.value,
                    key: 'silnicni'
                  })
                }} />
                <label>silniční 1500 Kč/den</label>
              </InputDiv>
              <InputDiv>

                <input type="number" id="silnicniPocet" min="0" style={{ width: '3em' }} value={objednavka.silnicniPocet} onChange={(e) => {
                  dispatch({
                    type: "toggle_number",
                    value: e.target.value,
                    key: "silnicniPocet",
                  });
                }} />
                  <label>počet kol</label>
              </InputDiv>
            </InputDivCol>

            {/* elektro gravel */}
            <InputDivCol>
            <img src={elektro} style={{ height: '90px', width: 'auto'  }} />
              <InputDiv>
                <input type="checkbox" id="gravel" onClick={(e) => {
                  dispatch({
                    type: 'toggle_gravel',
                    value: e.target.value,
                    key: 'gravel'
                  })
                }} />
                <label>elektro 2500 Kč/den</label>
              </InputDiv>
              <InputDiv>
                <input type="number" id="gravelPocet" min="0" style={{ width: '3em' }} value={objednavka.gravelPocet} onChange={(e) => {
                  dispatch({
                    type: "toggle_number",
                    value: e.target.value,
                    key: "gravelPocet",
                  });
                }} />
                <label> počet kol</label>
              </InputDiv>
            </InputDivCol>
          </FormSectionFlex>
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
          <SectionTitle>Nosič:</SectionTitle>
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
          <SectionTitle>Konečná kalkulace:</SectionTitle>

          <label>Finální cena:</label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <label>Zadejte váš rozpočet:</label>
          <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type: "toggle_number",
              value: e.target.value,
              key: "rozpocet",
            });
          }}
          />
          {/* kontrola*/}

          <KontrolaButton checked={checked} onClick={() => {
            checkPrice(objednavka);
            console.log(checked);


          }}>
            Kontrola
          </KontrolaButton>
        </FormSection>
      </Formular>
    </PageContainer >
  );
}

export default App;
