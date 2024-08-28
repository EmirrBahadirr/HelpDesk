import './App.css';
import { createTicket, deleteTicket, fetchAllTickets, updateTicket } from './service/ticketService';
import TicketForm from './components/ticketForm/TicketForm.js';
import { useEffect, useState} from "react";
import { formatDate } from './util/dateUtil.js';
import Table from './components/Table/Table.js';
import MUITable from './components/Table/MUITable.js';

const COLS = [
  "ID",
  "Summary",
  "Priority",
  "Status",
  "Create Date",
  "Update Date"
]

function App() {
  const [tickets, setTickets] = useState([]);// tüm ticketleri koymak için bir arrayımız var en başta boş
  const [currentTicket, setCurrentTicket] = useState({});// tek bir bilet koymak için bir obje en başta boş

  const loadTicket = (ticket) => {
    setCurrentTicket(ticket);
  }

  const unloadTicket = () => {
    setCurrentTicket({});
  }

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  const sendSaveRequest = async (id, summary ,priority, status ,create_date, update_date) => {
    const newTicket = {id, summary ,priority, status ,create_date : formatDate(new Date(create_date)), update_date : formatDate(new Date(update_date))};// format datesiz çalışıyor mu kontrol et
    
    const savedTicket = id ? await updateTicket(newTicket, id) : await createTicket(newTicket);
    if(!savedTicket){
      return;
    }

    getAllTickets();// ticketlarımız her iki durumda da güncellenecek ve ticketların güncellenmesi için hook ile beraber tüm verileri çekip tekrar renderlamış oluyoruz
    setCurrentTicket(savedTicket);
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

  useEffect(() => { // bu kısmı sor !!
    getAllTickets();
  },[])

  return (
    <div className="App">
      <div className='main-table'>
        <h2 className='title'>Tickets</h2>
        <MUITable
          list={tickets}
          colNames={COLS}
          onSelect={loadTicket}
          onDelete={sendDeleteRequest}
         />
      </div>
      <div className='main-form'>
        <h2 className='title'>Modify Ticket</h2>
        <TicketForm
          id={currentTicket.id}
          summary={currentTicket.summary}
          priority={currentTicket.priority}
          status={currentTicket.status}
          createDate={currentTicket.create_date ? new Date(currentTicket.create_date) : new Date()}
          updateDate={currentTicket.update_date ? new Date(currentTicket.update_date) : new Date()}
          readonly = {false}
          onSubmit={sendSaveRequest}
          onClear={unloadTicket}
        />
      </div>
      
    </div>
  );
}

export default App;
