import Gooact, { render, Component } from '../gooact';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            items: props.items
        };
        
      }

    columns()  {
        if ((this.state.items || []).length < 1) {
            return [];
        }
        return Object.keys(this.state.items[0]);
    } 

    render() {
        return (
            <div>
            <h1 class="table-header">{this.state.name}</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        {
                            this.columns().map(header => <th>{header||''}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
                        this.state.items.map(row => {
                            return (<tr>
                                {                        
                                    this.columns().map(header => <td>{row[header]||''}</td>)
                                }
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }    
}

export default Report;