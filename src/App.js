import React, {useState, useEffect} from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listEquations } from './graphql/queries';
import { createEquation as createEquationMutation } from './graphql/mutations';
import { API } from 'aws-amplify';

const initialFormState = { name: '0', description: '0'}

function App() {
    const [currentVal,setCurrentVal]=useState('');
    const [equations, setEquations] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchEquations();
    }, []);

    async function fetchEquations() {
        const apiData = await API.graphql({ query: listEquations });
        setEquations(apiData.data.listEquations.items);
    }

    const Num=(e)=>{
        e.preventDefault();
        let val= currentVal + e.target.name;
        setCurrentVal(val);
    }
    
    const Clear=(e)=>{
        e.preventDefault();
        setCurrentVal('');
    }

    const Equal = async (e)=>{
        e.preventDefault();
        var flag = 0
        for (var i = 0; i < currentVal.length; i++) {
            if(currentVal.charAt(i) === "+") {
                let vals = currentVal.split("+");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }        
            } else if(currentVal.charAt(i) === "-") {
                let vals = currentVal.split("-");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                } 
            } else if(currentVal.charAt(i) === "*") {
                let vals = currentVal.split("*");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                } 
            } else if(currentVal.charAt(i) === "\\") {
                let vals = currentVal.split("\\");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                } 
                let val = vals[0]/vals[1];
                setCurrentVal(val);
                flag = 1;
            } else if(currentVal.charAt(i) === "%") {
                let vals = currentVal.split("%");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                } 
            } else if(currentVal.charAt(i) === "^") {
                let vals = currentVal.split("^");
                if(vals[0] > 127 || vals[0] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                }
                if(vals[1] > 127 || vals[1] < -127){
                    setCurrentVal("Error Invalid Byte");
                    flag = 1;
                } 
                let val = Math.pow(vals[0], vals[1]);
                setFormData({ ...formData, 'name': val, "description" :currentVal})
                setCurrentVal(val);
                await API.graphql({ query: createEquationMutation, variables: { input: formData } });
                setEquations([ ...equations, formData]);
                flag = 1;
            }
        }
        if(flag === 0) {

            let val = parseInt(eval(currentVal));
            setFormData({ ...formData, 'name': val, "description" :currentVal})
            setCurrentVal(val);
            await API.graphql({ query: createEquationMutation, variables: { input: formData } });
            setEquations([ ...equations, formData]);
        }
    }

    return (
        <div className="App">
            <div className="app-title">
                <h1> Calculator</h1>
            </div>
            <input type="text" id="result" value={currentVal} readOnly/>
            <br/>
            <form class="grid-container"> 
                <button class="grid-item" name="7" onClick={Num}>7</button>
                <button class="grid-item" name="8" onClick={Num}>8</button>
                <button class="grid-item" name="9" onClick={Num}>9</button>
                <button class="grid-item" name="+" onClick={Num}>+</button>
                <button class="grid-item" name="-" onClick={Num}>-</button>

                <button class="grid-item" name="4" onClick={Num}>4</button>
                <button class="grid-item" name="5" onClick={Num}>5</button>
                <button class="grid-item" name="6" onClick={Num}>6</button>
                <button class="grid-item" name="*" onClick={Num}>*</button>
                <button class="grid-item" name="\" onClick={Num}>\</button>
                <button class="grid-item" name="1" onClick={Num}>1</button>
                <button class="grid-item" name="2" onClick={Num}>2</button>
                <button class="grid-item" name="3" onClick={Num}>3</button>
                <button class="grid-item" name="^" onClick={Num}>^</button>
                <button class="grid-item" name="%" onClick={Num}>%</button>

                <button class="grid-item" name="0" onClick={Num}>0</button>
                <button class="grid-item" name="Clear" onClick={Clear}>Clear</button>
                <button class="grid-item" name="=" onClick={Equal}>=</button>
            </form>

            <div id="List">
                {
                    equations.slice(0).reverse().slice(0,18).map(equation => (
                    <tbody id="ul" key={equation.id || equation.name}>
                      <tr><td>{equation.description} = {equation.name}</td></tr>
                    </tbody>
                    ))
                }
            </div>

            <div className="App">
                <AmplifySignOut />
            </div>

        </div>
    );
}

export default withAuthenticator(App);
