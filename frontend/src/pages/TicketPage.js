import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { fetchAllTickets, deleteTicket, updateTicket, createTicket } from '../service/ticketService';
import MUITable from '../components/Table/MUITable';
import { formatDate } from '../util/dateUtil';

const COLS = [
  "ID",
  "Summary",
  "Priority",
  "Status",
  "Create Date",
  "Update Date"
];
function TicketsPage() {
    const [tickets, setTickets] = useState([]);
  
    const getAllTickets = async () => {
      setTickets(await fetchAllTickets());
    };

    const sendSaveRequest = async (id, summary ,priority, status ,create_date, update_date) => {
      const newTicket = {id, summary ,priority, status ,create_date : formatDate(new Date(create_date)), update_date : formatDate(new Date(update_date))};// format datesiz çalışıyor mu kontrol et
      
      const savedTicket = await updateTicket(newTicket, id);
      if(!savedTicket){
        return;
      }
  
      getAllTickets();// ticketlarımız her iki durumda da güncellenecek ve ticketların güncellenmesi için hook ile beraber tüm verileri çekip tekrar renderlamış oluyoruz
    };
  
    const sendDeleteRequest = async (ticket) => {
      if(!ticket?.id){
        return;
      }
  
      const result = await deleteTicket(ticket.id);
      if(!result){
        return;
      }
      getAllTickets();
    };
  
    useEffect(() => {
      getAllTickets();
    }, []);
  
    return (
      <div>
        <Typography variant="h4" gutterBottom align='center'>
          Tickets
        </Typography>
        <MUITable 
          list={tickets}
          colNames={COLS}
          onDelete={sendDeleteRequest}
          onSubmitFromPage={sendSaveRequest}
        />
      </div>
    );
  }
  
  export default TicketsPage;