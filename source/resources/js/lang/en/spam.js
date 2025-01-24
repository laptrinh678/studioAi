export default {
    spam_patterns: {
        title_tag_modal: "Tag Spam Pattern",
        title_add_modal: "Add Spam Pattern",
        label: "Label",
        content: "Content",
        warning: {
            portlet_title: "Warning list",
            content: "Content",
            count_content: "Count_content",
            count_spam: "Count spam",
            count_calling: "Count calling",
            count_called: "Count called",
            spam_application: "Spam application",
            when_created: "When created",
            action: "Action",
            enter_content: "Enter content",
            select_spam_application: "Select spam application",
            enter_content_title: "Content",
            select_spam_application_placeholder: "Select a source",
            search_placeholder: "Enter some keyword",
            title_tag_modal: "Tag Spam Pattern",
            notification_tag_error: "Tag label progress is error, try again",
            notification_tag_success: "Tag label successfully",
            notification_ignore_error:
                "Ignore label progress is error, try again",
            notification_ignore_success: "Ignore label successfully",
            are_you_sure_ignore_these_label:
                "Are you sure to ignore these labels?",
            must_select_at_least_one_record: "Must select at least one record",
            ignore_confirm: "Are you sure to ignore these labels?"
        },
        labeled: {
            portlet_title: "labeled Spam List",
            content: "Content",
            spam_application: "Spam application",
            when_updated: "When updated",
            action: "Action",
            enter_content: "Enter content",
            select_spam_application: "Select spam application",
            enter_content_title: "Content",
            select_spam_application_placeholder: "Select a source",
            search_placeholder: "Enter some keyword",
            title_tag_modal: "Tag Spam Pattern",
            notification_tag_error: "Tag label progress is error, try again",
            notification_tag_success: "Tag label successfully",
            notification_ignore_error:
                "Ignore label progress is error, try again",
            notification_ignore_success: "Ignore label successfully",
            are_you_sure_ignore_these_label:
                "Are you sure to ignore these labels?",
            must_select_at_least_one_record: "Must select at least one record",
            ignore_confirm: "Are you sure to ignore these labels?",
            spam_label: "Spam label",
            who_updated: "Who updated",
            notification_add_error: "Add label progress is error, try again",
            notification_add_success: "Add label successfully"
        },
        noti: {
            no_record: "Không có bàn ghi để export",
            export_error: "Quá trình export gặp sự cố, vui lòng thử lại sau"
        },
        white: {
            add_white: "Add white",
            edit_white: "Edit white",
            content: "Content",
            type: "Type",
            status: "Status",
            datatable: {
                title: "List Sms White",
                columns: {
                    content: "Content",
                    type: "Type",
                    sync: "Sync"
                }
            },
            placeholder: {
                content: "Enter content",
                type: "Select type"
            },
            import_title: "Import white",
            import_modal: {
                wait_import: "Wait a minute",
                report: "Report",
                import: "Import record from Excel (Example file below)",
                example_file: "Example sms file",
                file: "File",
                note: "Note",
                select_file: "Select file upload"
            },
            sync: "Sync",
            history_modal: {
                title: "Show history",
                information: "Information",
                history_content: "History content"
            }
        },
        keyword: {
            add_keyword: "Add keyword",
            edit_keyword: "Edit keyword",
            value: "Value",
            type: "Type",
            status: "Status",
            reason: "Reason",
            datatable: {
                title: "List keyword",
                columns: {
                    value: "Value",
                    type: "Type",
                    reason: "Reason",
                    sync: "Sync"
                }
            },
            placeholder: {
                value: "Enter value",
                reason: "Enter reason",
                type: "Select type"
            },
            import_title: "Import keyword",
            import_modal: {
                wait_import: "Wait a minute",
                report: "Report",
                import: "Import sms white (Example file below)",
                example_file: "Example sms file",
                file: "File",
                note: "Note",
                select_file: "Select file upload"
            }
        }
    },
    statistic: {
        pattern: {
            title: "Pattern",
            total: "Total:",
            spam: "Spam labeled:",
            ham: "Ham labeled:",
            ignore: "Ignore labeled:",
            customer_feedback: "From customers' feedback:",
            customer_feedback_spam: "labeled as spam from customers' feedback:"
        },
        phone: {
            title: "Phone",
            internal_banned: "Internal carrier's one-way banned phone count:",
            external_banned: "External carriers' one-way banned phone count:",
            ignore: "Ignored phone count:"
        },
        flow: {
            total: "Total",
            spam: "Spam",
            warn: "Warn"
        },
        missing: {
            title: "Missing",
            content: "Content",
            count_content: "Count content",
            label_name: "Label name",
            time: "Time",
            review_progress: "Review progress"
        },
        wrong: {
            title: "Wrong",
            content: "Content",
            count_content: "Count content",
            count_calling: "Count calling",
            count_called: "Count called",
            label_name: "Label name",
            time: "Time",
            review_progress: "Review progress"
        }
    },
    tool: {
        hot_regex: {
            title: "List hot regex",
            regex: "Regex",
            time: "Time"
        },
        label: {
            title: "List label",
            name: "Name",
            display_name: "Display name",
            parent: "Parent",
            placeholder: {
                name: "Enter name",
                display_name: "Enter display name",
                parent: "Select parent"
            }
        }
    },
    phone: {
        blackwhite: {
            title: "Black white list",
            target_number: "Target number",
            black_white_number: "Black white number",
            list_type: "Type",
            reason: "Reason",
            placeholder: {
                target_number: "Enter target number",
                black_white_number: "Enter black white number",
                list_type: "Select type",
                reason: "Enter reason"
            }
        },
        type: {
            title: "List type",
            calling_number: "Calling number",
            carrier: "Carrier",
            list_type: "List type",
            reason: "Reason",
            store_log: "Store log",
            placeholder: {
                calling_number: "Enter calling number",
                reason: "Enter reason",
                store_log: "Select store log",
                list_type: "Select list type",
                carrier: "Select carrier"
            }
        },
        logtrace: {
            title: "Log phone",
            request_content: "Phone request",
            from_time: "From",
            to_time: "To",
            placeholder: {
                request_content: "Enter number"
            }
        },
        query: {
            calling_info: "Calling info",
            calling_number: "Calling number",
            carrier: "Carrier",
            list_type: "List type",
            active: "Active",
            count_opened: "Count opened",
            count_banned: "Count banned",
            history: "History",
            detail: "Detail",
            content: "Content",
            content_type: "Content type",
            count_content: "Count content",
            count_called: "Count called",
            action_type: "Action type",
            resolved: "Resolved"
        },
        processed: {
            title: "Processed",
            calling_number: "Calling number",
            count_content: "Count content",
            count_called: "Count called",
            carrier: "Carrier",
            list_type: "List type",
            content: "Content",
            content_type: "Content type",
            active: "State",
            detail: "Detail",
            calling_info: "Calling info",
            count_opened: "Count opened",
            count_banned: "Count banned",
            action_type: "Action type",
            resolved: "Resolved"
        },
        warning: {
            title: "Warning spam",
            propose: "Propose open/ban",
            apply: "Approve lock",
            calling_number: "Calling number",
            count_content: "Count content",
            count_called: "Count called",
            count_block: "Count block",
            content: "Content",
            carrier: "Carrier",
            list_type: "List type",
            active: "State",
            placeholder: {
                calling_number: "Enter calling number",
                reason: "Enter reason"
            }
        }
    }
};
