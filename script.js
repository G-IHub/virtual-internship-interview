const SUPABASE_URL = "https://llwkglzivzqsmgvgpryr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsd2tnbHppdnpxc21ndmdwcnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzE5MTksImV4cCI6MjA5MDcwNzkxOX0.Obi-0sZrfZfWLJxo5hdxO_en7EzJe0eiG3QUlOOkQdU";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");
const modal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hide previous messages
//   successMsg.classList.remove("show");

  errorMsg.classList.remove("show");

  // Disable button and show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="loading"></span> Submitting...';

  try {
    // Collect form data
    const formData = {
      email: document.getElementById("email").value,
      full_name: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      source: document.getElementById("source").value,
      course_of_interest: document.getElementById("courseOfInterest").value,
      career_stage: document.getElementById("careerStage").value,
      expectations: document.getElementById("expectations").value,
      research_motivation: document.getElementById("research_motivation").value,
      commitment: document.getElementById("commitment").value,
      created_at: new Date().toISOString(),
    };

    // Insert data into Supabase
    const { data, error } = await supabaseClient
      .from("applications")
      .insert([formData]);

    if (error) {
      throw error;
    }

    // Show success modal
    modal.style.display = "flex";
    form.reset();
  } catch (error) {
    console.error("FULL ERROR:", error);
    alert(error.message);
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
//   console.log(window.supabase);
});

// Close modal when clicking the close button
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


