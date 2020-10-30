using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace GMS
{
    public partial class frmEnquiryAdd : System.Web.UI.Page
    {
        static string strConn = ConfigurationSettings.AppSettings["strCon"];

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Convert.ToString(Session["user_id"]) == "")
                {
                    Response.Redirect("index.aspx");
                }

            }
        }

        [System.Web.Services.WebMethod]
        public static string fnEnquiryInsert(string strFullName, string strEmail ,string strMobile, string strAlternateMobile, 
                                             string strEnquiryDate, string strGender, string strAddress)
        {
            int intReturn = 0;

            try
            {
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_enquiry_add", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["user_id"]);                

                if (strFullName == "")
                {
                    objCmd.Parameters.Add("@enqu_name", SqlDbType.VarChar, 100).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_name", SqlDbType.VarChar, 100).Value = strFullName;
                }

                if (strEmail == "")
                {
                    objCmd.Parameters.Add("@enqu_email", SqlDbType.VarChar, 100).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_email", SqlDbType.VarChar, 100).Value = strEmail;
                }

                if (strMobile == "")
                {                    
                    objCmd.Parameters.Add("@enqu_mobile_1", SqlDbType.VarChar, 15).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_mobile_1", SqlDbType.VarChar, 15).Value = strMobile;
                }

                if (strAlternateMobile == "")
                {
                    objCmd.Parameters.Add("@enqu_mobile_2", SqlDbType.VarChar, 15).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_mobile_2", SqlDbType.VarChar, 15).Value = strAlternateMobile;
                }

                if (strEnquiryDate == "")
                {
                    objCmd.Parameters.Add("@enqu_date", SqlDbType.DateTime).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_date", SqlDbType.DateTime).Value = strEnquiryDate;
                }

                if (strGender == "")
                {
                    objCmd.Parameters.Add("@enqu_gender", SqlDbType.Char,1).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_gender", SqlDbType.Char,1).Value = strGender;
                }

                if (strAddress == "")
                {
                    objCmd.Parameters.Add("@enqu_address", SqlDbType.VarChar, -1).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@enqu_address", SqlDbType.VarChar, -1).Value = strAddress;
                }

                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                intReturn = -1;
            }

            return intReturn.ToString();
        }
    }
}