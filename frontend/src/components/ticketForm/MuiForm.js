import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent } from '@mui/material';
import { formatDate } from '../../util/dateUtil';

function MuiForm({
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
  const [tPriority, settPriority] = useState(priority);
  const [tStatus, settStatus] = useState(status);
  
  useEffect(() => {
    settSummary(summary || "");
    settPriority(priority);
    settStatus(status);
  }, [id, priority, status, summary]);

  return ( // key id ile tüm formu id değiştiğinde renderlamaya zorladık.
    <Card key={id} sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3 }}>    
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="ID"
              value={id}
              type="number"
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}// bu labelin yukarıda sabit kalmasını sağladı
              label="Summary"
              value={tSummary}
              onChange={(e) => settSummary(e.target.value)} // burada setTsummary nin boş olmamasını sağla
              fullWidth
              variant="outlined"
              disabled={readonly}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                value={tPriority}
                onChange={(e) => settPriority(e.target.value)}
                label="Priority"
                disabled={readonly}
              >
                <MenuItem value="LOW">LOW</MenuItem>
                <MenuItem value="MID">MID</MenuItem>
                <MenuItem value="HIGH">HIGH</MenuItem>
                <MenuItem value="EXTREME">EXTREME</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={tStatus}
                onChange={(e) => settStatus(e.target.value)}
                label="Status"
                disabled={readonly}
              >
                <MenuItem value="CREATED">CREATED</MenuItem>
                <MenuItem value="REJECTED">REJECTED</MenuItem>
                <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Create Date"
              type="date"
              value={formatDate(createDate)}
              fullWidth
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Update Date"
              type="date"
              value={formatDate(updateDate)}
              fullWidth
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmit(id, tSummary ,tPriority, tStatus ,createDate, new Date())}
              fullWidth
              sx={{ m: 1 }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={onClear}
              fullWidth
              sx={{ m: 1 }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MuiForm;
