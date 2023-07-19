import '../form/formStyle.css';

const Form = () => {
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div className='input-container'>
      <form className='sing-in-form'>
        <div className='content'>
          <label for='name' className='name'>
            Name
          </label>
          <input type='text' id='name' placeholder='Your Name' />
        </div>

        <div className='content'>
          <label htmlFor='email' className='email'>
            e-mail
          </label>
          <input type='email' placeholder='Your mail id' />
        </div>
        <div className='content'>
          <label htmlFor='password' className='password'>
            Password
          </label>
          <input type='email' placeholder='Your mail id' />
        </div>
        <button type='submit' className='submit' onClick={submitHandler}>
          Signin
        </button>
      </form>
    </div>
  );
};

export default Form;
