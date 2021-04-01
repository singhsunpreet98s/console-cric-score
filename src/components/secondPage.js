import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@material-ui/core'
import { commentry } from './commentry';
import CheckIcon from '@material-ui/icons/Check';
import { fb } from '../fbConfig'

export default function SecondPage() {
   const [notepad, setNotepad] = useState("")
   const [mr1, setMr1] = useState(0)
   const [mr2, setMr2] = useState(0)

   const handleSubmit = () => {
      const mydt = fb.database().ref('other');
      mydt.set({
         commentry: notepad,
         mr1: mr1,
         mr2: mr2
      })
   }
   return (
      <div style={{ padding: '0px 20px' }}>
         <div>
            Market Rate
            <input type="text" onChange={(e) => setMr1(e.target.value)} style={{ border: '2px solid teal', width: 50, height: 50, outline: 'none', marginLeft: 20 }} />
            <input type="text" onChange={(e) => setMr2(e.target.value)} style={{ border: '2px solid teal', width: 50, height: 50, outline: 'none', marginLeft: 20, marginRight: 20 }} />
            <IconButton style={{ color: 'teal' }}><CheckIcon /></IconButton>
         </div>
         <div>
            <TextField
               id="standard-multiline-flexible"
               label="NotePad"
               fullWidth
               multiline
               rowsMax={10}
               value={notepad}
               onChange={(e) => setNotepad(e.target.value)}
            />
         </div>
         <Button fullWidth style={{ backgroundColor: 'teal', color: 'white', marginTop: 20 }} onClick={() => handleSubmit()}>Submit</Button>
         {
            commentry.map((item, index) => {
               return <Button key={index} onClick={() => { setNotepad(item.comment) }}>{item.name}</Button>
            })
         }
      </div>
   )
}
