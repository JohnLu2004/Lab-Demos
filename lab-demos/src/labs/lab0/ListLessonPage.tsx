import "./Lab0.css";
import { useNavigate } from "react-router";
import { ThemeProvider } from "../../ThemeContext";

export default function ListLessonPage() {
  const navigate = useNavigate();
  const updateOnClick = () => {
    navigate("/");
  };
  return (
    <>
      <ThemeProvider>
        <h1>Counterbalancing Lists</h1>
        <h2>What is a counterbalancing list?</h2>
        <p>
          A counterbalancing list is a list of stimuli formatted in a way such
          that the observer does not have to worry about participants dealing
          with a faulty set of stimuli
        </p>
        <h2>What to consider while making a counterbalancing list</h2>
        <p>
          The main thing you need to worry about is the number of conditions you
          have. This will determine the size of each list as well as how many
          lists we need for the experiment
        </p>
        <h2>Formatting a stimulus</h2>
        <p>
          Say we have 3 conditions that we want to check. Maybe we want to see
          if 1 condition has an effect rather than the other conditions
        </p>
        <p>
          To do that, we'd have to make general stimuli number 1 and then create
          3 variations to fit the 3 conditions
        </p>
        <p>
          1 a "The food that I ordered delicious, and it tasted even better"
        </p>
        <p>1 b "The food that I ordered smelled delicious, and it tasted"</p>
        <p>1 c "I ordered delicious, and it tasted better"</p>
        <h2>Formatting a stimulus</h2>
        <p>
          As can be seen above, we format our stimuli above like the following
        </p>
        <p>'Stimulus number' 'variation character' 'string sentence'</p>
        <h2>Creating counterbalancing lists</h2>
        <p>
          Above, we discussed how to create a formatted stimulus. We could juse
          use the 3 stimuli from the above randomly; however, the participant
          will catch on quick on the content of the stimulus
        </p>
        <p>
          To avoid this, we take 1 stimulus variation from 1. We then need 2
          more to complete the testing on all 3 variations. If our list is
          hypothetically larger, it will include 2a,2b,2c,3a,3b,3c, etc etc.
        </p>
        <p>
          We could take 1 stimuli from 2 and 1 stimuli from 3 to create a
          counterbalancing list of different stimuli. In Neuroscience, we use
          1a,2b,3c
        </p>
        <p>
          That's dandy and all, but now we have 1b and 1c left. We can create
          another counterbalancing list with 1b,2c, and 3a
        </p>
        <p>This is the concept of counterbalancing lists</p>
        <h2>Size of lists</h2>
        <p>
          More often than not, we want to test for a variation's effects more
          than once. In Neuroscience, we test with a variation for as many
          variations as there are
        </p>
        <p>
          What this means is that if I had 4 variations, then I would want to
          test 1 variation 4 times. I also need to make a counterbalancing by
          adding in 3 elements times 4 since we don't want two variations to
          have the same condition.
        </p>
        <p>
          In total, we would have a list of size 16 since 4 variations times 4
          tests = 16
        </p>
        <button
          onClick={() => {
            updateOnClick();
          }}
        >
          Return to homepage
        </button>
      </ThemeProvider>
    </>
  );
}
