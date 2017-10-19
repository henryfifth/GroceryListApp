export default class ApiUtil {

selectorToServer(id) {
  fetch('/items/' + id, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    selector: this.props.items.selector
  })
}).then((res) => {
  return res.json();
}).then((data) => {
  this.setState({
    data: data
  });
});
}

getList(){
  return new Promise((resolve, reject) => {
    if (this.state.initialized) {
      this.setState({
        initialized: false
      });
    }
    fetch('/items').then((webObj)=>{
      return webObj.json();
    }, ()=>{
      reject('fetch failed')
    }).then((data)=>{
      resolve()
      this.items = data;
      this.setState({
        initialized: true,
      });
    }, (err)=>{
      reject(err);
    })
  });
}

deleteItem(id) {
  return fetch('/items/' + id, {
    method: 'DELETE'
  }).then((res) => {
    console.log(res);
    return res.json();
  }).then((data) => {
    this.setState({
      items: data
    });
  });
};

sendData() {
  fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: this.state.input,
      quantity: this.state.quantity,
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    this.setState({
      items: data
    });
  });
};

}