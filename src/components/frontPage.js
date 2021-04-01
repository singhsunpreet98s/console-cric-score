import React, { useState } from 'react';
import { Grid, Button, IconButton, TextField, Select, MenuItem, FormHelperText,Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import './frontpage.css';
import {fb} from '../fbConfig'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SecondPage from './secondPage';
import PublishIcon from '@material-ui/icons/Publish';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function FrontPage() {
   const [matchTitle, setMatchTitle] = useState('wait')
   const [teamA, setTeamA] = useState("wait")
   const [TeamB, setTeamB] = useState("wait")
   const [flagA, setFlagA] = useState("wait")
   const [flagB, setFlagB] = useState("wait")
   const [bowler,setBowler] = useState({
      name:'wait',
      balls:0,
      wicket:2
   })
   const [live,setLive] = useState(false)
   const [scoreA, setScoreA] = useState(0)
   const [wickA, setWickA] = useState(0)
   const [scoreB, setScoreB] = useState(0)
   const [wickB, setWickB] = useState(0)
   const [players, setPlayers] = useState([])
   const [batsmanCurr, setBatsmanCurr] = useState("wait")
   const [batsman2, setBatsman2] = useState("wait")
   const [teamAovers,setTeamAOvers] = useState(0.0)
   const [teamBovers,setTeamBOvers] = useState(0.0)
   const [cbm, setcbm] = useState({
      runs: 0,
      balls: 0
   })
   const [teamSwap, setTeamSwap] = useState(false)
   const [bm, setbm] = useState({
      runs: 0,
      balls: 0
   })
   const [notepad, setNotepad] = useState("")

   const titleClick = () => {
      
   }
   const teamNameClick = () => {

   }
   const teamFlagClick = () => {

   }
   const sIncre = () => {
      setScoreA(scoreA + 1)
   }
   const sDec = () => {
      setScoreA(scoreA - 1)
   }
   const wInc = () => {
      setWickA(wickA + 1)
   }
   const wDec = () => {
      setWickA(wickA - 1)
   }
   const handleNotepad = () => {
      setPlayers(notepad.split(','))

   }
   const handleAll = () =>{
     const myData = fb.database().ref('appData');
     myData.set({
        teamAName:teamA,
        teamBName:TeamB,
        title:matchTitle,
        flagA:flagA,
        flagB:flagB,
        scoreB:`${scoreB}/${wickB}`,
        scoreA:`${scoreA}/${wickA}`,
        currBat:{
           pName:batsmanCurr,
           score:cbm.runs,
           balls:cbm.balls
        },
        batsMan2:{
           pname:batsman2,
           score:bm.runs,
           balls:bm.balls
        },
        overA:String(parseInt(teamAovers/6))+"."+String(parseInt(teamAovers%6)),
        overB:String(parseInt(teamBovers/6))+"."+String(parseInt(teamBovers%6)),
        bowler:{
           name:bowler.name,
           balls:String(parseInt(bowler.balls/6))+"."+String(parseInt(bowler.balls%6)),
           wicket:bowler.wicket
        },
        live:live

     })
   }
   
   const swap = () => {
      const a = batsmanCurr
      setBatsmanCurr(batsman2)
      setBatsman2(a)
      const arr = cbm
      setcbm(bm)
      setbm(arr)
   }
   const CurrentTeam = () => {
      if (teamSwap) {
         return 'Team B'
      }
      else {
         return 'Team A'
      }
   }
   const toogleLive = () =>{
         setLive((prev)=>!prev)
   }
   return (
      <Grid container>
         <Fab onClick={()=>handleAll()} color="primary" aria-label="add"  style={{position:'fixed',right:20,bottom:20,backgroundColor:'teal'}}>
        <PublishIcon />
        
      </Fab>
      
         <Grid item xs={12} sm={6} md={6} lg={6}>
         <FormControlLabel
        control={<Switch size="small"  checked={live} onChange={toogleLive}/>}
        label="Live"
         />
            
         <Button fullWidth style={{backgroundColor:'teal',color:'white',marginTop:20}} onClick={()=>setTeamSwap(!teamSwap)}>Team Swap current team = <CurrentTeam />
            
         </Button>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
               <div className="matchTitle">
                  <input type="text" name="title" onChange={(e) => { setMatchTitle(e.target.value) }} placeholder="match title" />
                  <IconButton style={{ color: 'teal' }} onClick={() => { titleClick() }}><CheckIcon /></IconButton>
               </div>
               <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20 }}>
                  <div className="team">
                     <input type="text" name="title" onChange={(e) => { setTeamA(e.target.value) }} placeholder="TeamA" />

                  </div>
                  <div className="team" style={{ marginLeft: 5 }}>
                     <input type="text" name="title" onChange={(e) => { setTeamB(e.target.value) }} placeholder="TeamB" />
                  </div>
                  <IconButton style={{ color: 'teal' }}><ArrowForwardIcon /></IconButton>
               </div>
               <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20 }}>
                  <div className="team">
                     <input type="text" name="title" onChange={(e) => { setFlagA(e.target.value) }} placeholder="Team A flag" />

                  </div>
                  <div className="team" style={{ marginLeft: 5 }}>
                     <input type="text" name="title" onChange={(e) => { setFlagB(e.target.value) }} placeholder="Team B flag" />
                  </div>
                  <IconButton style={{ color: 'teal' }}><ArrowForwardIcon /></IconButton>
               </div>
               <div style={{ marginTop: 20, fontSize: 16, border: '2px solid teal', display: 'flex', borderRadius: 2 }}>

                  <div style={{ width: '45%', marginLeft: 20 }}>
                     Score TeamA
                     <IconButton style={{ color: 'teal' }} onClick={() => sDec()}><RemoveIcon /></IconButton>
                     <input type="text" value={scoreA} style={{ outline: 'none',textAlign:'center', border: 'none', height: 20, width: 40 }} />
                     <IconButton style={{ color: 'teal' }}  onClick={() => sIncre()}><AddIcon /></IconButton>
                  </div>
                  <div>
                     Wickets
                     <IconButton style={{ color: 'teal' }} onClick={() => wDec()}><RemoveIcon /></IconButton>
                     <input type="text" value={wickA} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
                     <IconButton style={{ color: 'teal' }} onClick={() => wInc()}><AddIcon /></IconButton>
                  </div>
                  <div style={{ float: 'right' }}>
                     <IconButton style={{ color: 'teal' }} ><SendIcon /></IconButton>
                  </div>

               </div>
               <div style={{ marginTop: 20, fontSize: 16, border: '2px solid teal', display: 'flex', borderRadius: 2 }}>

                  <div style={{ width: '45%', marginLeft: 20 }}>
                     Score TeamB
                     <IconButton style={{ color: 'teal' }} onClick={() => setScoreB(scoreB - 1)}><RemoveIcon /></IconButton>
                     <input type="text" value={scoreB} style={{textAlign:'center', outline: 'none', border: 'none', height: 20, width: 40 }} />
                     <IconButton style={{ color: 'teal' }} onClick={() => setScoreB(scoreB + 1)}><AddIcon /></IconButton>
                  </div>
                  <div>
                     Wickets
                     <IconButton style={{ color: 'teal' }} onClick={() => setWickB(wickB - 1)}><RemoveIcon /></IconButton>
                     <input type="text" value={wickB} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
                     <IconButton style={{ color: 'teal' }} onClick={() => setWickB(wickB + 1)}><AddIcon /></IconButton>
                  </div>
                  <div style={{ float: 'right' }}>
                     <IconButton style={{ color: 'teal' }} ><SendIcon /></IconButton>
                  </div>


               </div>
               <div>
               <div style={{ marginTop: 20, fontSize: 16, border: '2px solid teal', display: 'flex', borderRadius: 2 }}>

<div style={{ width: '40%', marginLeft: 20,fontSize:12 }}>
   TeamA over
   <IconButton style={{ color: 'teal' }}  onClick ={()=>setTeamAOvers(teamAovers-1)}><RemoveIcon /></IconButton>
   <input type="text" value={String(parseInt(teamAovers/6))+"."+String(parseInt(teamAovers%6))} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
   <IconButton style={{ color: 'teal' }} onClick ={()=>setTeamAOvers(teamAovers+1)}><AddIcon /></IconButton>
</div>
<div style={{ width: '40%',fontSize:12  }}>
   TeamB over
   <IconButton style={{ color: 'teal' }} onClick ={()=>setTeamBOvers(teamBovers+1)} ><RemoveIcon /></IconButton>
   <input type="text" value={String(parseInt(teamBovers/6))+"."+String(parseInt(teamBovers%6))} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
   <IconButton style={{ color: 'teal' }} onClick ={()=>setTeamBOvers(teamBovers+1)}><AddIcon /></IconButton>
</div>
<div style={{ float: 'right' }}>
   <IconButton style={{ color: 'teal' }}><SendIcon /></IconButton>
</div>


</div>
               
               </div>
               <div style={{ marginTop: 20 }}>
                  <TextField
                     id="standard-multiline-flexible"
                     label="NotePad"
                     fullWidth
                     multiline
                     rowsMax={10}
                     value={notepad}
                     onChange={(e) => setNotepad(e.target.value)}
                  />
                  <Button fullWidth style={{backgroundColor:'teal',color:'white'}} onClick={() => handleNotepad()}>Submit</Button>
               </div>
               <div style={{ display: 'flex' }}>
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                     <Select
                        style={{ width: 200 }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={batsmanCurr}
                        onChange={(e) => setBatsmanCurr(e.target.value)}
                     >
                        {
                           players.map((item, index) => {
                              return <MenuItem value={item} key="index">{item}</MenuItem>
                           })
                        }
                        <FormHelperText>CurrentBatsMan</FormHelperText>
                     </Select>
                     <div>runs
                     <IconButton style={{ color: 'teal' }} onClick={() => {setcbm({runs:cbm.runs-1,balls:cbm.balls})
                     if(teamSwap) {setScoreB(scoreB-1)}else{setScoreA(scoreA-1)}
                  }}><RemoveIcon /></IconButton>
                        <input type="text" value={cbm.runs} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
                        <IconButton style={{ color: 'teal' }}  onClick={() => {setcbm({runs:cbm.runs+1,balls:cbm.balls})
                        if(teamSwap) {setScoreB(scoreB+1)}else{setScoreA(scoreA+1)}
                     }}><AddIcon /></IconButton>
                     </div>
                     <div>balls
                     <IconButton onClick={() => {setcbm({runs:cbm.runs,balls:cbm.balls-1})
                  if(teamSwap){setTeamBOvers(teamBovers-1)}else{setTeamAOvers(teamAovers-1)}
                  }}><RemoveIcon /></IconButton>
                        <input type="text" value={String(parseInt(cbm.balls/6))+"."+String(parseInt(cbm.balls%6))} style={{ textAlign:'center',outline: 'none', border: 'none', height: 20, width: 40 }} />
                        <IconButton style={{ color: 'teal' }} onClick={() => {setcbm({runs:cbm.runs,balls:cbm.balls+1})
                        if(teamSwap){setTeamBOvers(teamBovers+1)}else{setTeamAOvers(teamAovers+1)}
                     }}><AddIcon /></IconButton>
                     </div>
                     <div><IconButton style={{ color: 'teal' }} onClick ={()=>{setcbm({runs:0,balls:0})}}>
                        <ReplayIcon /></IconButton></div>
                  </div>

                  <IconButton style={{width:150,height:150,color:'teal'}}onClick={() => { swap() }}><CachedIcon /></IconButton>
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                     <Select
                        style={{ width: 200 }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={batsman2}
                        onChange={(e) => setBatsman2(e.target.value)}
                     >
                        {
                           players.map((item, index) => {
                              return <MenuItem value={item} key="index">{item}</MenuItem>
                           })
                        }
                        <FormHelperText>2nd batsman</FormHelperText>
                     </Select>

                     <div>score --
                   
                        {bm.runs}
                       
                     </div>
                     <div>balls --
                   
                     {String(parseInt(bm.balls/6))+"."+String(parseInt(bm.balls%6))}
                       
                     </div>
                     <div><IconButton style={{ color: 'teal' }} onClick ={()=>{setbm({runs:0,balls:0})}}>
                        <ReplayIcon /></IconButton></div>
                  </div>
                  
               </div>
               <div>
               <Select
                        style={{ width: 200 }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={bowler.name}
                        onChange={(e) => setBowler({...bowler,name:e.target.value})}
                     >
                        {
                           players.map((item, index) => {
                              return <MenuItem value={item} key="index">{item}</MenuItem>
                           })
                        }
                        <FormHelperText>Bowler</FormHelperText>
                     </Select>
                     B <input type="text" 
                     onChange={(e)=>{
                        setBowler({...bowler,balls:e.target.value})
                     }}
                     style={{width:40,outline:'none',border:'2px solid teal',height:40,marginRight:20}} />
                     W <input type="text" 
                     onChange={(e)=>{
                        setBowler({...bowler,wicket:e.target.value})
                     }}
                     style={{width:40,outline:'none',border:'2px solid teal',height:40,marginRight:20}} />
                     <IconButton style={{color:'teal'}} ><CheckIcon /></IconButton>

               </div>
               
               <Button fullWidth style={{backgroundColor:'teal',color:'white',marginTop:20}} onClick={() => handleNotepad()}>Submit</Button>
               

            </div>

         </Grid>
         <Grid item xs={12} sm={6} md={6} lg={6}>
                        <SecondPage />
         </Grid>
      </Grid >
   )
}
