export default function Intro(){

    return(
        <div className="intro" data-testid='intro'>
            <h1> THE SELF TESTING WEBSITE </h1>
            <p> I came up with this unique idea to showcase my software engineering skills by creating a website that runs tests on itself! Clicking the button will trigger a github actions pipeline that runs e2e and unit tests on this very website. You&apos;ll see the logs of the pipeline stages as it runs live and then it will also fetch a report of the tests as evidence they really ran. It should take around 2 minutes to complete.</p>
        </div>
    )
}
