import React from 'react'
import { Paper, Alert, Snackbar } from '@mui/material';
import MuiForm from '../components/ticketForm/MuiForm';
import { useEffect, useState } from "react";
import { createTicket } from '../service/ticketService';
import { formatDate } from '../util/dateUtil';


function CreateTicketPage() {
  
  
  const [createdTicket, setcreatedTicket] = useState({});
  const [formKey, setFormKey] = useState(0);// Formu resetlemek için bunu kullandım

  const [success, setSuccess] = useState(false);  // Başarı durumunu tutan state
  const [error, setError] = useState(false);  // Hata durumu için

  const handleCloseAlert = () => {
    setSuccess(false);  // Alert kapanınca durumu sıfırla
    setError(false);    // Hata alertini de sıfırla
  };
  
  

  const unloadTicket = () => {
    
    setcreatedTicket({});
    setFormKey((prevKey) => prevKey + 1);
  }

  const sendSaveRequest = async (id, summary, priority, status, create_date, update_date) => {
    const newTicket = { id, summary, priority, status, create_date: formatDate(new Date(create_date)), update_date: formatDate(new Date(update_date)) };// format datesiz çalışıyor mu kontrol et

    const savedTicket = await createTicket(newTicket);
    if (!savedTicket.id) {
      console.log("bilet oluşmadı");
      setError(true);
      return;
    }
    setSuccess(true);
    unloadTicket(); //!!BURAYI SOR  {} bu şekilde içi boş obje koyunca çalışmıyor useEffect kullanmak zorunda kaldım o da neden çözdü anlamadım.
  };

  return (
    <Paper>
      <MuiForm
        key={formKey}
        id={createdTicket.id}
        summary={createdTicket.summary}
        priority={createdTicket.priority}
        status={"CREATED"}
        readonly={false}
        isCreateMode = {true}
        onSubmit={sendSaveRequest}
        onClear={unloadTicket}>
        
      </MuiForm>

      {/* Başarı mesajını göstermek için */}
      <Snackbar open={success} autoHideDuration={2500} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity="success">
          Ticket başarıyla oluşturuldu!
        </Alert>
      </Snackbar>

      {/* Hata mesajı için */}
      <Snackbar open={error} autoHideDuration={2500} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity="error">
          Ticket oluşturulamadı, lütfen tekrar deneyin!
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default CreateTicketPage