var fn = () => {
    console.log(456);
};
fn();

class Student {
    hello() {
        console.log("hello");
    }
}
var s = new Student();
s.hello();

class leo extends Student {

}
var l = new leo();
l.hello();