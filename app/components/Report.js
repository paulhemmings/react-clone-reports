import Gooact, { render, Component } from '../gooact';

class ReportRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            row: props.row,
            onClick: props.onClick
        }

        // debug
        if (props.row.price != '') {
            console.log(props.row);
        }
    }

    render() {
        return (
        <tr>                                
            {
                this.state.columns.map(column => { 
                    return (<td>
                        <a href="#" onClick={e => this.state.onClick(this.state.row)}>{this.state.row[column]||''}</a>
                    </td>)
                })
            }
        </tr>)
    }
}

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            items: props.items,
            onClick: props.onClick,
            columns: this.columns(props.items)
        };
        
      }

    columns(items)  {
        if ((items || []).length < 1) {
            return [];
        }
        return Object.keys(items[0]);
    } 
    
    render() {
        return (
        <div>
            <h1 class="table-header">{this.state.name}</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        {
                            this.state.columns.map(header => <th>{header||''}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
                        this.state.items.map(row => (
                            <ReportRow  columns={this.state.columns} 
                                        row={row} 
                                        onClick={this.state.onClick} />))
                    }
                </tbody>
            </table>
        </div>
        );
    }    
}

export default Report;