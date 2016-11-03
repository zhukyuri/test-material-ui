import React, {Component} from 'react';
import dateformat from 'dateformat';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import {red100,red200,red300,} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Create from 'material-ui/svg-icons/content/create';
import Add from 'material-ui/svg-icons/content/content-copy';
import Feedback from 'material-ui/svg-icons/action/feedback';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableBody,
  TableFooter,
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
  }
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
      tasks: tasks,
      openDialog: false,
      openDialogComments: false,
      commentId: null,
      dialogTitle: '-',
      editId: null,
      editData: {priority: 0},
      editType: 1
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleDialogEdit = this.handleDialogEdit.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleOpenComments = this.handleOpenComments.bind(this);
    this.handleCloseComments = this.handleCloseComments.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);

    this.updatePriority = this.updatePriority.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.setData = this.setData.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.isComment = this.isComment.bind(this);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper style={styles.Pager} zDepth={3}>
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

  handleOk(p) {
    if (this.state.editId) {
      tasks[this.state.editId] = this.state.editData;
    }
    else {
      tasks.push(this.state.editData);
    }
    this.setState({
      tasks: tasks,
      openDialog: false
    });
  };

  handleDialogEdit(ind) {
    this.setState({
      openDialog: true,
      dialogTitle: typeEdit[0],
      editId: ind,
      editData: tasks[ind],
      editType: 0
    });
  };

  handleDialogCopy(ind) {
    this.setState({
      openDialog: true,
      dialogTitle: typeEdit[1],
      editId: null,
      editData: {status: 0, textTask: `Копія: ${tasks[ind].textTask}`, date: new Date(), priority: tasks[ind].priority},
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
      editData: {status: 0, textTask: `Нове завдання ${tasks.length}`, date: new Date(), priority: 0},
      editType: 0
    });
  };

  handleOpenComments(ind) {
    this.setState({
      openDialogComments: true,
      commentId: ind
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

  updateDate(e, index, value) {
    let dat = dateformat(new Date(index), 'yyyy-mm-dd');
    let o = Object.assign(this.state.editData, {date: dat});
    this.setState({editData: o});
  }

  setData(dat) {
    let res = new Date(dat);
    return res;
  }

  setDateFormat(dat) {
    let res = dateformat(new Date(dat), 'dd-mm-yyyy');
    return res;
  }

  isComment(p) {
    let res = comments.filter((i, ind) => {
      return i.id === p;
    });
    return res.length===0 ? false : true;
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
          value={this.setData(this.state.editData.date)}
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
    return this.state.tasks.map((i, ind) => {
      return (
        <TableRow key={ind}>
          <TableRowColumn>{status[i.status]}</TableRowColumn>
          <TableRowColumn>{i.textTask}</TableRowColumn>
          <TableRowColumn>{this.renderDate(i.date)}</TableRowColumn>
          <TableRowColumn> { this.renderPriority(i.priority) }</TableRowColumn>
          <TableRowColumn>
            <IconButton tooltip="SVG Icon" onTouchTap={() => this.handleDialogEdit(ind)}>
              <Create />
            </IconButton>
            <IconButton tooltip="SVG Icon" onTouchTap={() => this.handleDialogCopy(ind)}>
              <Add />
            </IconButton>
            { this.renderFeedback(ind) }
          </TableRowColumn>
        </TableRow>
      )
    });
  }

  renderFeedback(ind) {
    if(this.isComment(ind)) {
      return (
        <IconButton tooltip="SVG Icon" onTouchTap={() => this.handleOpenComments(ind)}>
          <Feedback />
        </IconButton>
      )
    } else {
      return '';
    }
  }

  renderDate(param) {
    let color = '#FFF';
    if (new Date(param) <  new Date()) color = red100;
    return (
      <Chip backgroundColor={color}>
        {this.setDateFormat(param)}
      </Chip>
    )
  }

  renderPriority(param) {
    let color = '#FFF'
    if (param === 1) color = red100;
    return (
      <Chip backgroundColor={color}>
        {priority[param]}
      </Chip>
    )
  }
}

export default Main;
