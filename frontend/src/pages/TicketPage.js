import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { fetchAllTickets, deleteTicket } from '../service/ticketService';
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
    const [currentTicket, setCurrentTicket] = useState({});
  
    const loadTicket = (ticket) => {
      setCurrentTicket(ticket);
    };
  
    const unloadTicket = () => {
      setCurrentTicket({
        id: "", 
        summary: "", 
        priority: "LOW", // Varsayılan değer
        status: "CREATED", // Varsayılan değer
        createDate: new Date(), 
        updateDate: new Date()
      });
    };
  
    const getAllTickets = async () => {
      setTickets(await fetchAllTickets());
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
      setCurrentTicket({});
    };
  
    useEffect(() => {
      getAllTickets();
    }, []);
  
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Tickets
        </Typography>
        <MUITable 
          list={tickets}
          colNames={COLS}
          onSelect={loadTicket}
          onDelete={sendDeleteRequest}
        />
      </div>
    );
  }
  
  export default TicketsPage;