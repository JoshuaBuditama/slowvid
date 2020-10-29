import React from "react";
import { RouteComponentProps } from "@reach/router";

function Home(props: RouteComponentProps) {
  return (
      <div>
	      <section className="section is-medium has-text-centered">
		      <div className="container">
		        <p className="is-size-3 has-text-centered">Slowvid is active
		        </p>
		        <br/>
		        <br/>
		          <div className="column is-half">
		            <div className="field">
		              <p className="control">
			              <form action="notifications">
			                <input
			                  type="submit"
			                  className="button is-link"
			                  value="Share my close contacts with a health care professional"
			                />
		                </form>
		              </p>
		            </div>
		          </div>
		       	<br/>
		          <div className="column is-half">
		            <div className="field">
		              <p className="control">
		              	<form action="">
			                <input
			                  type="submit"
			                  className="button is-link"
			                  value="Your security and privacy is SlowVID's first priority. Learn how"
			                />
		                </form>
		              </p>
		            </div>
		          </div>
		      </div>
	      </section>
    </div>


  );
}

export default Home;
