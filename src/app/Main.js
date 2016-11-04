import React, {Component} from 'react';
import dateformat from 'dateformat';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import {red100, red200, red300,} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Create from 'material-ui/svg-icons/content/create';
import Add from 'material-ui/svg-icons/content/content-copy';
import Feedback from 'material-ui/svg-icons/action/feedback';
import SpeacerNotes from 'material-ui/svg-icons/action/speaker-notes';
import SpeacerNotesOff from 'material-ui/svg-icons/action/speaker-notes-off';
import Clear from 'material-ui/svg-icons/content/clear';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import ActionHome from 'material-ui/svg-icons/action/home';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {tasks, status, priority, typeEdit, comments} from './sampleData';

const styles = {
  container: {
    margin: '0 auto',
    textAlign: 'center',
    padding: 20,
    width: '90%',
    display: 'block'
  },
  Pager: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'block',
    boxSizing: 'border-box',
    paddingTop: '10px'
  },
  PagerFilter: {
    width: '90%',
    margin: '10px auto',
    textAlign: 'center',
    display: 'inline-block',
    boxSizing: 'border-box',
  },
  checkBlock: {
    width: '20%',
    maxWidth: '250px',
    padding: '10px',
    display: 'block',
    float: 'left',
    boxSizing: 'border-box',
  },
  checkbox: {
    marginBottom: 0,
    textAlign: 'left'
  },

};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openDialog: false,
      openDialogComments: false,
      commentId: null,
      dialogTitle: '-',
      editId: null,
      editData: {},
      editType: 1,
      filters: {f1: 0, f2: 0, f3: 0, f4: dateformat(new Date(), 'yyyy-mm-dd'), f5: false}
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleDialogEdit = this.handleDialogEdit.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleOpenComments = this.handleOpenComments.bind(this);
    this.handleCloseComments = this.handleCloseComments.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleFilter1 = this.handleFilter1.bind(this);
    this.handleFilter2 = this.handleFilter2.bind(this);
    this.handleFilter3 = this.handleFilter3.bind(this);
    this.handleFilter4 = this.handleFilter4.bind(this);
    this.handleCheckDateFilter = this.handleCheckDateFilter.bind(this);

    this.updatePriority = this.updatePriority.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.getDateFormat = this.getDateFormat.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.setDateFormatIso = this.setDateFormatIso.bind(this);
    this.isComment = this.isComment.bind(this);
    this.filterTask = this.filterTask.bind(this);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper style={styles.Pager} zDepth={3}>
          <Paper style={styles.PagerFilter} zDepth={1}>
            <div style={styles.checkBlock}>
              <RadioButtonGroup name="filter1" defaultSelected="0" onChange={this.handleFilter1}>
                <RadioButton
                  value="0"
                  label="Всі"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="1"
                  label="Відкриті"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="2"
                  label="Прострочені"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="3"
                  label="Виконані"
                  style={styles.checkbox}
                />
              </RadioButtonGroup>
            </div>
            <div style={styles.checkBlock}>
              <RadioButtonGroup name="filter2" defaultSelected="0" onChange={this.handleFilter2}>
                <RadioButton
                  value="0"
                  label="Всі"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="1"
                  label="Гарячі"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="2"
                  label="Не гарячі"
                  style={styles.checkbox}
                />
              </RadioButtonGroup>
            </div>
            <div style={styles.checkBlock}>
              <RadioButtonGroup name="filter3" defaultSelected="0" onChange={this.handleFilter3}>
                <RadioButton
                  value="0"
                  label="Всі"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="1"
                  label="З коментарями"
                  style={styles.checkbox}
                />
                <RadioButton
                  value="2"
                  label="Без коментарів"
                  style={styles.checkbox}
                />
              </RadioButtonGroup>
            </div>
            <div style={styles.checkBlock}>
               <DatePicker
                hintText="Дата завершення завдання"
                container="inline"
                mode="landscape"
                floatingLabelText="Дата завершення завдання"
                floatingLabelFixed={true}
                value={this.getDateFormat(this.state.filters.f4)}
                disabled={!this.state.filters.f5}
                onChange={(e, index, value) => this.handleFilter4(e, index, value)}
              >
              </DatePicker>
              <Checkbox
                label="Фільтр по даті"
                checked={this.state.filters.f5}
                style={styles.checkbox}
                onCheck={this.handleCheckDateFilter}
              />
            </div>
          </Paper>
          <div style={styles.container}>
            { this.renderDialog() }
            { this.renderCommentsDialog() }
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Статус</TableHeaderColumn>
                  <TableHeaderColumn>Текст</TableHeaderColumn>
                  <TableHeaderColumn>Дата</TableHeaderColumn>
                  <TableHeaderColumn>Пріоритет</TableHeaderColumn>
                  <TableHeaderColumn>
                    <Chip onTouchTap={this.handleAddTask} backgroundColor={red200}>
                      <Avatar size={15}>+</Avatar>
                      Нове завдання
                    </Chip>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                { this.renderTable() }
              </TableBody>
            </Table>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }

  handleCheckDateFilter(i, value) {
    this.setState({filters: {...this.state.filters, f5: value}});
  }

  handleFilter1(i, value) {
    let filters = this.state.filters;
    this.setState({filters: {...filters, f1: parseInt(value)}});
  }

  handleFilter2(i, value) {
    let filters = this.state.filters;
    this.setState({filters: {...filters, f2: parseInt(value)}});
  }

  handleFilter3(i, value) {
    let filters = this.state.filters;
    this.setState({filters: {...filters, f3: parseInt(value)}});
  }

  handleFilter4(i, value) {
    this.setState({filters: {...this.state.filters, f4: this.setDateFormatIso(value)}});
  }

  handleOk() {
    let t = tasks;
    if (this.state.editId) {
      t[this.state.editId] = this.state.editData;
    }
    else {
      t.push(this.state.editData);
    }
    this.setState({
 //     tasks: t,
      openDialog: false
    });
  };

  handleDialogEdit(id) {
    let state = {
      openDialog: true,
      dialogTitle: typeEdit[0],
      editId: id,
      editData: this.getTaskById(id),
      editType: 0
    };
    this.setState(state);
  };

  handleDialogCopy(id) {
    let task = this.getTaskById(id);
    this.setState({
      openDialog: true,
      dialogTitle: typeEdit[1],
      editId: null,
      editData: {status: 0, textTask: `Копія: ${task.textTask}`, date: new Date(), priority: task.priority},
      editType: 0
    });
  };

  handleDialogClose() {
    this.setState({
      openDialog: false
    });
  };

  handleAddTask() {
    this.setState({
      openDialog: true,
      dialogTitle: typeEdit[1],
      editId: null,
      editData: {
        id: tasks.length,
        status: 0,
        textTask: `Нове завдання ${tasks.length}`,
        date: new Date(),
        priority: 0
      },
      editType: 0
    });
  };

  handleOpenComments(id) {
    this.setState({
      openDialogComments: true,
      commentId: id
    });
  };

  handleCloseComments() {
    this.setState({
      openDialogComments: false
    });
  };

  updatePriority(e, index, value) {
    let o = Object.assign(this.state.editData, {priority: value});
    this.setState({editData: o});
  }

  updateStatus(e, index, value) {
    let o = Object.assign(this.state.editData, {status: value});
    this.setState({editData: o});
  }

  updateText(p) {
    let o = Object.assign(this.state.editData, {textTask: p.target.value});
    this.setState({editData: o});
  }

  updateDate(e, value) {
    let dat = dateformat(new Date(value), 'yyyy-mm-dd');
    let o = Object.assign(this.state.editData, {date: dat});
    this.setState({editData: o});
  }

  compareDateDeadLine(date) {
    return new Date(date) < new Date();
  }

  getTaskById(id) {
    let res =  tasks.filter((i) => {
      return id === i.id;
    });
    return res.length===0 ? null : res[0];
  }

  getDateFormat(dat) {
    let res = new Date(dat);
    return res;
  }

  setDateFormat(dat) {
    let res = dateformat(new Date(dat), 'dd-mm-yyyy');
    return res;
  }

  setDateFormatIso(dat) {
    let res = dateformat(new Date(dat), 'yyyy-mm-dd');
    return res;
  }

  isDone(id) {
    let task = this.getTaskById(id);
    return task.status === 2;
  }

  filterTask() {
    let s = this.state.filters;
    return tasks.filter((i, ind) => {
      let f = true;
      // f1
      switch (s.f1) {
        case 1:
          f = f && (i.status === 0 || i.status === 1) ;
          break;
        case 2:
          f = f && this.compareDateDeadLine(i.date) && !this.isDone(i.id);
          break;
        case 3:
          f = f && (i.status === 2);
          break;
      }

      // f2
      switch (s.f2) {
        case 1:
          f = f && (i.priority === 1) ;
          break;
        case 2:
          f = f && (i.priority === 0) ;
          break;
      }

      // f3
      let is = this.isComment(i.id);
      switch (s.f3) {
        case 1:
          f = f && is ;
          break;
        case 2:
          f = f && !is ;
          break;
      }

      // f4
      if(this.state.filters.f5) f = f && (this.state.filters.f4 === i.date);

      return f;
    });
  }

  isComment(id) {
    let res = comments.filter((i, ind) => {
      return i.id === id;
    });
    return res.length === 0 ? false : true;
  }

  renderCommentsDialog() {
    const actions = [
      <FlatButton
        label="Закрити"
        primary={true}
        onTouchTap={this.handleCloseComments}
      />,
    ];
    return (
      <Dialog
        title={'Коментарі до завдання'}
        actions={actions}
        modal={false}
        autoDetectWindowHeight={true}
        open={this.state.openDialogComments}
        onRequestClose={this.handleCloseComments}
        autoScrollBodyContent={true}
      >
        <div style={styles.container}>

          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Дата</TableHeaderColumn>
                <TableHeaderColumn>Коментар</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              { this.renderCommentsTable() }
            </TableBody>
          </Table>
        </div>
      </Dialog>
    )
  }

  renderCommentsTable() {
    let id = this.state.commentId;
    return (
      comments.filter((i) => {
        return i.id === id;
      }).map((i, ind) => {
        return (
          <TableRow key={ind}>
            <TableHeaderColumn>{this.setDateFormat(i.date)}</TableHeaderColumn>
            <TableHeaderColumn>{i.comments}</TableHeaderColumn>
          </TableRow>
        )
      })
    )
  }

  renderDialog() {
    const actions = [
      <FlatButton
        label="Відмінити"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Готово"
        primary={true}
        onTouchTap={this.handleOk}
      />,
    ];
    return (
      <Dialog
        title={ this.state.dialogTitle}
        actions={actions}
        modal={false}
        autoDetectWindowHeight={true}
        open={this.state.openDialog}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        <TextField
          hintText="Text"
          floatingLabelText="Текст"
          floatingLabelFixed={true}
          defaultValue={this.state.editData.textTask}
          onBlur={p => this.updateText(p)}
        />
        <br />
        <DatePicker
          hintText="Дата завершення завдання"
          container="inline"
          mode="landscape"
          floatingLabelText="Дата завершення завдання"
          floatingLabelFixed={true}
          value={this.getDateFormat(this.state.editData.date)}
          onChange={(e, index, value) => this.updateDate(e, index, value)}
        />
        <SelectField
          floatingLabelText="Статус"
          value={this.state.editData.status}
          onChange={ (e, index, value) => this.updateStatus(e, index, value) }
        >
          { status.map((i, ind) => {
            return ( <MenuItem value={ind} key={ind} primaryText={i}/> )
          }) }
        </SelectField>
        <SelectField
          floatingLabelText="Пріоритет"
          value={this.state.editData.priority}
          onChange={ (e, index, value) => this.updatePriority(e, index, value) }
        >
          { priority.map((i, ind) => {
            return ( <MenuItem value={ind} key={ind} primaryText={i}/> )
          }) }
        </SelectField>
      </Dialog>
    )
  }

  renderTable() {
    return this.filterTask().map((i, ind) => {
      return (
        <TableRow key={ind}>
          <TableRowColumn>{status[i.status]}</TableRowColumn>
          <TableRowColumn>{i.textTask}</TableRowColumn>
          <TableRowColumn>{this.renderDate(i)}</TableRowColumn>
          <TableRowColumn> { this.renderPriority(i.priority) }</TableRowColumn>
          <TableRowColumn>
            <IconButton tooltip="Редагувати" onTouchTap={() => this.handleDialogEdit(i.id)}>
              <Create />
            </IconButton>
            <IconButton
              tooltip="Копіювати"
              disabled={!this.isDone(i.id)}
              onTouchTap={() => this.handleDialogCopy(i.id)}
            >
              <Add />
            </IconButton>
            { this.renderFeedback(i.id) }
          </TableRowColumn>
        </TableRow>
      )
    });
  }

  renderFeedback(id) {
    if (this.isComment(id)) {
      return (
        <IconButton tooltip="Коментарі" onTouchTap={() => this.handleOpenComments(id)}>
          <SpeacerNotes />
        </IconButton>
      )
    } else {
      return (
        <IconButton tooltip="Коментарі" onTouchTap={() => this.handleOpenComments(id)}>
          <SpeacerNotesOff />
        </IconButton>
      );
    }
  }

  renderDate(param) {
    let color = '#FFF';
    if (new Date(param.date) < new Date() && !this.isDone(param.id)) color = red100;
    return (
      <Chip backgroundColor={color}>
        {this.setDateFormat(param.date)}
      </Chip>
    )
  }

  renderPriority(param) {
    let color = '#FFF';
    if (param === 1) color = red100;
    return (
      <Chip backgroundColor={color}>
        {priority[param]}
      </Chip>
    )
  }
}

export default Main;
