const Form = () => {
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form>
        <div className='input-container'>
          <div className='content'>
            <label htmlFor='name' className='name'>
              Name
            </label>
            <input type='text' placeholder='Your Name' />
          </div>

          <div className='content'>
            <label htmlFor='email' className='email'>
              e-mail
            </label>
            <input type='email' placeholder='Your mail id' />
          </div>
          <div className='content'>
            <label htmlFor='pssword' className='password'>
              Password
            </label>
            <input type='email' placeholder='Your mail id' />
          </div>
        </div>
        <button type='submit' className='submit' onClick={submitHandler}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Form;
