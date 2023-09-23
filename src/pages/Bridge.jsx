/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';

import config from '../config';

const Bridge = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });
  // fetch messages
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    if (authState && authState.isAuthenticated) {
      fetch('http://127.0.0.1:5000/data',{
        'mode': 'cors',
        'methods':'GET',
        headers : {
          'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(data => 
          setdata({
            name: data.Name,
            age: data.Age,
            programming: data.programming,
        })
        )
      .catch(error => console.log(error))
    };
}, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>Name: {data.name}</p>
                <p>Age: {data.age}</p>
                <p>Programming: {data.programming}</p>
            </header>
        </div>
    );
};

export default Bridge;
