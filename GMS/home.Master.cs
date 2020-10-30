using System;

namespace GMS
{
    public partial class home : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Convert.ToString(Session["user_id"]) == "")
            {
                Response.Redirect("index.aspx");
            }
            else
            {
                if (!this.IsPostBack)
                {
                    //this.imgPhoto.Src = "http://erp.kopinitservices.com/userdocs/photos/" + Session["user_id"].ToString() + ".jpg";
                }
            }
            string strFname = Convert.ToString(Session["user_fname"]);
            string strLname = Convert.ToString(Session["user_lname"]);

            divUserNameLeft.InnerText = strFname + " " + strLname;
            spanUserNameTop.InnerText = "Welcome, " + strFname + " " + strLname;

          
        }
    }

}