import React, { useEffect, useState } from 'react';
import { formatDate } from '../../util/dateUtil';
import './TicketForm.css';

function TicketForm({
    id = "",
    summary,
    priority,
    status,
    createDate = new Date(),
    updateDate = new Date(),
    readonly = false,
    onSubmit = () => {},
    onClear = () => {}
}) {
  const [tSummary, settSummary] = useState(summary);  
  const [tPriority, settPriority] = useState(priority); // useState nedir öğren !!!
  const [tStatus, settStatus] = useState(status);
  
  useEffect(() => {
    settSummary(summary || "");
    settPriority(priority  || "LOW");
    settStatus(status || "CREATED");
  }, [id, priority, status, summary]);
  

  return (
    <div className='TicketForm'>
        <div className='form'>
            <div className='form-group'>
              <label htmlFor='id'>ID</label>
              <input type = "number" name='id' value={id} disabled></input>
            </div>
            <div className='form-group'>
              <label htmlFor='summary'>Summary</label>
              <input type='text' name='summary' value={tSummary} onChange={(e) => settSummary(e.target.value)} disabled={readonly}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='priority'>Priority</label>
              <select name='priority' value={tPriority} onChange={(e) => settPriority(e.target.value)} disabled={readonly}>
                <option>LOW</option>
                <option>MID</option>
                <option>HIGH</option>
                <option>EXTREME</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <select name='status' value={tStatus} onChange={(e) => settStatus(e.target.value)} disabled={readonly}>
                <option>CREATED</option>
                <option>REJECTED</option>
                <option>IN PROGRESS</option>
                <option>COMPLETED</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='createDate'>CREATE DATE</label>
              <input type = "date" name='createDate' value={formatDate(createDate)} disabled></input>
            </div>
            <div className='form-group'>
              <label htmlFor='updateDate'>UPDATE DATE</label>
              <input type = "date" name='updateDate' value={formatDate(updateDate)} disabled></input>
            </div>
            <div className='button-group'>
              <button className='button' style={ {width:'50%'} } onClick={() => {
                onSubmit(id, tSummary ,tPriority, tStatus ,createDate, new Date().toString());
              }}>SUBMIT</button>
              <button onClick={onClear} style={ {width:'50%'} }>Clear</button>
            </div>
        </div>
    </div>
  )
}

export default TicketForm